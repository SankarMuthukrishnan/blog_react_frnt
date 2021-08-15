import React, { Suspense } from 'react';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Layout from "./layouts/index";

import Blog from './components/Pages/Blog';


class App extends React.Component {

    render() {
        return (
            <Router basename="/">
                <Layout>
                    <Suspense fallback={<div></div>}>
                        <Route render={({ location }) => (
                            <Switch location={location}>
                                <Route path='/blog' component={Blog} />
                            </Switch>
                        )} />
                    </Suspense>
                </Layout>
            </Router>
        );
    }
};


export default App;