import React from 'react';
export default class Spinner extends React.Component {
    static defaultProps = {
        color: '#8C8C8C',
        size: 'small'
    }

    getSize = () => {
        const { size } = this.props;
        if (size === "large") {
            return {
                width: 36,
                height: 36
            }
        }

        return {
            width: 20,
            height: 20
        }
    }

    render() {
        const { color } = this.props;
        return (
            <div className="spinner" style={this.getSize()}>
                <div className="spinner-blade" style={{ backgroundColor: color }}></div>
                <div className="spinner-blade" style={{ backgroundColor: color }}></div>
                <div className="spinner-blade" style={{ backgroundColor: color }}></div>
                <div className="spinner-blade" style={{ backgroundColor: color }}></div>
                <div className="spinner-blade" style={{ backgroundColor: color }}></div>
                <div className="spinner-blade" style={{ backgroundColor: color }}></div>
                <div className="spinner-blade" style={{ backgroundColor: color }}></div>
                <div className="spinner-blade" style={{ backgroundColor: color }}></div>
                <div className="spinner-blade" style={{ backgroundColor: color }}></div>
                <div className="spinner-blade" style={{ backgroundColor: color }}></div>
                <div className="spinner-blade" style={{ backgroundColor: color }}></div>
                <div className="spinner-blade" style={{ backgroundColor: color }}></div>
            </div>
        );
    }
}