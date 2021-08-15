import React from 'react';
import Label from "./Label";

class Disabled extends React.Component {
    render() {
        const {
            label, input: { value }, required } = this.props;
        return (
            <div className="formgroup disabledfield">
                <Label text={label} required={required} focus={true} />
                <div className="textbox" dangerouslySetInnerHTML={{ __html: value }}></div>
            </div>
        );
    };
};

export default Disabled;