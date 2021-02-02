import Cookies from 'react-cookies'
const ADMIN_TOKEN = 'adminToken'
const ADMIN_USER_NAME = 'adminUserName'

//存Token
export function setToken(token) {
    Cookies.save(ADMIN_TOKEN, token)
}

//存username
export function setAdminName(userName) {
    Cookies.save(ADMIN_USER_NAME, userName)
}

//取token
export function getToken() {
    return Cookies.load(ADMIN_TOKEN)
}

//取name
export function getAdminName() {
    return Cookies.load(ADMIN_USER_NAME)
}