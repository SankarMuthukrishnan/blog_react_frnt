import React from 'react';

export default class Layout extends React.Component {
    render() {
        const { children } = this.props;
        return (
            <>
                {/* <Header /> */}
                <div className={``}>
                    <div className={''}>{children}</div>
                    {/* <Footer /> */}
                </div>
            </>
        )
    }
}