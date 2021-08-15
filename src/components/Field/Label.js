import React from 'react';

export default class Label extends React.Component {
    static defaultProps = {
        focus: false
    };

    render() {
        const { text, focus } = this.props;
        if (text === false) {
            return null;
        }

        return (
            <div className={`accountsec_inputlab ${focus === true ? " " + "focus" : ""}`}>
                <span>{text}</span>
            </div>
        )
    }
}