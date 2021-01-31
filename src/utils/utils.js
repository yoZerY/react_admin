const ADMIN_TOKEN = 'adminToken'

export function setToken(token) {
    sessionStorage.setItem(ADMIN_TOKEN, token)
}

export function getToken() {
    return sessionStorage.getItem(ADMIN_TOKEN)
}