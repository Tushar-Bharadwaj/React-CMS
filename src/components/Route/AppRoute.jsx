import React from 'react';
import { Route } from 'react-router-dom';

/**
 * Router Component that accomodates different layouts
 */

const AppRoute = ({ component : Component, layout : Theme, ...rest }) => (
    <Route 
        {...rest}
        render={props => (
            <Theme>
                <Component {...props}/>
            </Theme>
        )} />
);

export default AppRoute;