import React from 'react';
import $ from "jquery";
import ModalBase from './ModalBase';

export default class DialogBox extends React.Component {
    static defaultProps = {
        title: "",
        type: "",
        content: "",
        buttons: "",
        dialogClass: "",
        onClose: false
    }

    constructor(props) {
        super(props);
        this.state = {
            openClass: "",
            closeClass: ""
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                openClass: " dialog-open"
            })
        }, 0)
        $(document).on('keyup', this.keyUp);
    }

    keyUp = (e) => {
        if (e.key === "Escape") {
            this.onCloseHandler();
        }
    }

    onCloseHandler = () => {
        this.setState({
            closeClass: " dialog-remove"
        }, () => {
            setTimeout(() => {
                $(document).off('keyup', this.keyUp);
                this.props.onClose();
            }, 1250)
        })
    }

    render() {
        const { content, dialogClass, children } = this.props;
        const { openClass, closeClass } = this.state;
        return (
            <ModalBase>
                <div className={`dialog-box-overlay ${dialogClass ? " " + dialogClass : ""} ${openClass} ${closeClass}`}> 
                <a className="col dialox-box-close" onClick={this.onCloseHandler}></a>
                    <div className="dialog-box">
                        <div className="dialog-wrapper">
                            {content && content(this.onCloseHandler)}
                            {children && <div className="dialogContent">{children}</div>}
                        </div>
                    </div>
                </div>
            </ModalBase>
        )
    }
}