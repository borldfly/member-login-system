const TOKEN_KEY = 'token';
const User = 'user';

// 用户信息以及token的存取
export function getToken() {
    return localStorage.getItem(TOKEN_KEY)
}

export function setToken(val) {
    localStorage.setItem(TOKEN_KEY, val)
}

export function getUser() {
    return JSON.parse(localStorage.getItem(User))
}

export function setUser(val) {
    localStorage.setItem(User, JSON.stringify(val))
}

export function removeAll() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(User);
}