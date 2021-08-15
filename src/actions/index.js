import api from "./api";


export function submitItem(attribute, data) {
    return dispatch => {
        dispatch({
            type: "CRUD",
            payload: data.actionUrl ? api.post(data.actionUrl, data) : (data.id ? api.put("/" + attribute, data) : api.post("/" + attribute, data)),
            meta: { attribute, crud_action: data.id ? "update" : "create" }
        })
    }
}

export function itemActions(attribute, action, data) {
    return dispatch => {
        dispatch({
            type: "CRUD",
            payload: api.delete("/" + attribute , data),
            meta: { attribute, crud_action: action }
        })
    }
}

export function getItems(attribute, data, action) {
    return dispatch => {
        dispatch({
            type: "FETCH_LIST",
            payload: api.get(`/${attribute}`, {
                ...(data || {})
            }),
            meta: { attribute, action: action || "fetching" }
        })
    }
}