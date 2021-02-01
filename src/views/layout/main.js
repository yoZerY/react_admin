import React from 'react'
import { Switch } from 'react-router-dom'
import AuthorizedRoute from '../../authorizedRoute/index'

import components from './components.js'

export default function Main() {
    return (
        <Switch>
            {
                components.map(component => {
                    return <AuthorizedRoute exact key={component.path} path={component.path} component={component.component} />
                })
            }
        </Switch>
    )
}
