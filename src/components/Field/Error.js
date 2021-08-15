
import React from 'react';

export default class Error extends React.Component {
    render() {
        const { meta: { error, touched }, servererror = [], label } = this.props;
        return (
            <React.Fragment>
                {
                    touched === true && error && (
                        <p className="helpblock">{error}</p>
                    )
                }
                {
                    touched === true && !error && servererror && (
                        <p className="helpblock">{servererror}</p>
                    )
                }
            </React.Fragment>
        )
    }
}