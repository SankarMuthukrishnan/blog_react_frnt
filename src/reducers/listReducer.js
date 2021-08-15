import { get, orderBy } from "lodash";

let checkList = (list, data) => {
	let index = list.findIndex(d => data._id === d._id);
	if (index >= 0) {
		return index;
	}
}

let defaultState = {
	fetching: false,
	status: false,
	data: [],
	order: {
		field: "id",
		sort_order: "desc"
	},
	original: [],
	list: [],
	item: {},
	serverError: [],
	end: true,
	total: 0,
	action: '',
	parent: {}
}

export default function listReducer(state = {
	comments: defaultState,
}, action) {
	switch (action.type) {
		case "FETCH_LIST_PENDING": {
			const { attribute } = action.meta;
			return {
				...state,
				[attribute]: {
					...defaultState,
					item: get(state[attribute], 'item', {}), //Setup here to prevent it from fetching all data for dropdowns
					action: action.meta.action,
					fetching: true
				}
			}
		}
		case "FETCH_LIST_REJECTED":
		case "CRUD_REJECTED":
		case "APPEND_REJECTED": {
			const { attribute } = action.meta;
			return {
				...state,
				[attribute]: {
					...defaultState
				}
			}
		}
		case "FETCH_LIST_FULFILLED": {
			const { attribute } = action.meta;
			console.log(attribute);
			console.log(get(action.payload.data, 'data.results', []));
			return {
				...state,
				[attribute]: {
					...defaultState,
					status: get(action.payload.data, "status", 0),
					data: get(action.payload.data, "data", []),
					original: get(action.payload.data, "data.results", []),
					list: get(action.payload.data, "data.results", []),
					total: get(action.payload.data, "data.mastertotal"),
					end: get(action.payload.data, "data.mastertotal") < 20 ? true : false,
					item: get(state[attribute], 'item', {}), //Resetup here to prevent it from fetching all data for dropdowns
					parent: get(action.payload.data, "data.parent", {})
				}
			}
		}
		case "CRUD_PENDING": {
			const { attribute, crud_action } = action.meta;
			return {
				...state,
				[attribute]: {
					...state[attribute],
					action: crud_action,
					status: false,
					fetching: crud_action
				}
			}
		}
		case "CRUD_FULFILLED": {
			const { attribute, crud_action } = action.meta;
			let status = get(action.payload.data, "status", 400);
			let crudSpliceActions = ['delete', 'restore', 'review'];
			let data = get(action.payload.data, "data", false);
			console.log(status);
			if (status === 200) {
				let new_data = state[attribute].list;
				if (crud_action === "create") {
					if (get(action.payload.data, "data", false) !== false) {
						if (!data.parent_id) {
							new_data = [
								action.payload.data.data,
								...new_data
							];
						} else {
							new_data.map((daItem, index) => {
								let ch_list = daItem['child_list'];
								if (daItem._id == data.parent_id) {
									daItem['child_list'] = [...daItem['child_list'], data];
									new_data.splice(index, 1, daItem);
								} else {
									ch_list.map((ch_ch_list, ch_ch_index) => {
										if (ch_ch_list._id == data.parent_id) {
											ch_ch_list['child_list'] = [...ch_ch_list['child_list'], data];
										}
									})
								}
							});
						}
					}
				}
				else if (crudSpliceActions.indexOf(crud_action) != -1) {
					let data = get(action.payload.data, "data", []);
					data.map(item => {
						let index = new_data.findIndex(d => item.id === d.id);
						if (index >= 0) {
							new_data.splice(index, 1, item);
						}
					})
				}
				else if (crud_action === "hide") {
					let data = get(action.payload.data, "data", []);
					data.map(item => {
						new_data = new_data.filter(d => item.id !== d.id)
					})
				}
				else if (crud_action === "update") {
					let data = get(action.payload.data, "data", {});
					let index = new_data.findIndex(d => data.id === d.id);
					if (index >= 0) {
						new_data.splice(index, 1, data);
					}
				}
				return {
					...state,
					[attribute]: {
						...state[attribute],
						fetching: false,
						status: get(action.payload.data, "status", 400),
						data: get(action.payload.data, "data", 400),
						action: crud_action,
						total: crud_action === "hide" ? state[attribute].total - 1 : state[attribute].total,
						list: [
							...new_data
						],
						parent: get(action.payload.data, "data.parent", {}),
						serverError: []
					}
				}
			}
			return {
				...state,
				[attribute]: {
					...state[attribute],
					status: get(action.payload.data, "status", 400),
					fetching: false,
					serverError: get(action.payload.data, "data", [])
				}
			}
		}

		default: {
			return state;
		}
	}
}