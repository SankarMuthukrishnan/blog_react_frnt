import React from 'react';
import renderHtml from 'react-render-html';
import { connect } from "react-redux";
import { reduxForm, getFormValues } from 'redux-form';
import { Field } from 'redux-form';
import { required } from 'redux-form-validators';
import { Input, Button } from '../../../components/Field';
import { getItems, submitItem } from '../../../actions';
import './style.css';
import blog_img from '../../../assets/images/blog.jpeg';
class Blog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            replyForm: false
        }
    }

    componentDidMount() {
        const { getItems } = this.props;
        getItems();
    }

    componentDidUpdate(prevProps) {
        const { data } = this.props;
        if (prevProps.data != data && data && data._id) {
            this.setState({ replyForm: false });
        }
    }

    commentsItemElement = (item, replyBtn = true) => {
        const { replyForm } = this.state;
        return (
            <div className={"comments-list"} key={`reply_${item._id}`} id={`comment_id_${item._id}`}>
                <div className={"comment-box comment-content-sec"}>
                    <div className={"p_rel"}>
                    <p className={'comment-content'} dangerouslySetInnerHTML={{ __html: item.content }}></p>
                    {replyBtn && <button className="col post-btn" onClick={() => this.commentReply(item._id)}>Reply</button>}
                    </div>
                </div>
                {replyForm == item._id && this.fromElement(replyForm)}
                {item.child_list && item.child_list.length > 0 && item.child_list.map((chil, inDx) => (
                    this.commentsItemElement(chil, false)
                ))}
            </div>
        )
    }

    onSubmit = (data) => {
        const { onSubmit } = this.props;
        const { replyForm } = this.state;
        if (replyForm) {
            data['parent_id'] = replyForm;
        }
        onSubmit(data);
    }

    fromElement = (parent_id) => {
        const { handleSubmit, invalid, serverError } = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <div className="comment-box">
                    <div className="p_rel">
                        {parent_id &&
                            <Field component={Input} name="parent_id" type="hidden" value={parent_id} />
                        }
                        <Field component={Input} name="content" validate={[required()]} label="" servererror={serverError["page-title"]} required={true} type={'editor'} />
                        <Button name="submit" submit={true} rectBtn={``} label={"Submit"} classes={`col comment-btn post-btn`} disabled={invalid} color="#3b3f54" fetching={''} />
                        {parent_id &&
                            <Button name="cancel" submit={false} rectBtn={``} label={"Cancel"} classes={`col comment-btn post-btn cancel-btn`} onClick={() => this.setState({ replyForm: false })} />
                        }
                    </div>
                </div>
            </form>
        )
    }

    commentReply = (parent_id) => {
        this.setState({ replyForm: parent_id });
    }

    render() {
        const { list = [] } = this.props;
        const { replyForm } = this.state;
        return (
            <div className="middle-wrap">
                <h3 className={'post-title'}>blog title</h3>
                <img className="image-wrap" src={blog_img} />
                <div className="comments-area">
                    <p>Comments</p>
                    <div>
                        {this.fromElement()}
                        {list && list.length > 0 && list.map((commentItem, index) => (
                            <div className={"comments-list"} key={`comment_${index}`} id={`comment_id_${commentItem._id}`}>
                                <div className={"comment-box comment-content-sec"}>
                                    <div className="p_rel">
                                        <p className={'comment-content'} dangerouslySetInnerHTML={{ __html: commentItem.content }}></p>
                                        <button className="col post-btn" onClick={() => this.commentReply(commentItem._id)}>Reply</button>
                                    </div>
                                </div>
                                {replyForm == commentItem._id && this.fromElement(replyForm)}
                                {commentItem.child_list && commentItem.child_list.length > 0 && commentItem['child_list'].map((ch, inDx) => (
                                    this.commentsItemElement(ch)
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.list.comments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getItems: (data) => { dispatch(getItems('comments', data)) },
        onSubmit: (data) => { dispatch(submitItem('comments', data)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'form',
    enableReinitialize: true
})(Blog));