import { Route, Redirect } from 'react-router-dom'
import { getToken } from '../utils/utils'

const AuthorizedRoute = (props) => {
    const token = getToken()
    const { component: Component, ...rest } = props
    return (
        <Route  {...rest} render={routerProps => (
            token ? <Component {...routerProps}></Component> : <Redirect to='/login'></Redirect>
        )} >
        </Route >
    )
}

export default AuthorizedRoute
