import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Search from '../../pages/search';
import Saved from '../../pages/saved';

const Router = () => (
    <Switch>
        <Route exact path="/Search" component={Search} />
        <Route exact path="/Saved" component={Saved} />
        <Route path="/">
            <Redirect to="/Search" />
        </Route>
    </Switch>
);

export default Router;
