import { Route, Redirect } from 'react-router-dom'
import { getToken } from '../utils/cookies'

const AuthorizedRoute = (props) => {
    const token = getToken()
    const { component: Component, ...rest } = props
    return (
        <Route  {...rest} render={routerProps => (
            token ? <Component {...routerProps} /> : <Redirect to='/login' />
        )} >
        </Route >
    )
}

export default AuthorizedRoute
