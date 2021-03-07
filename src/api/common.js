/**
 * 本地缓存公共方法
 */
export const storage = {
    get(k) {
        return localStorage.getItem(k);
    },
    set(k,v) {
        localStorage.setItem(k, v);
    },
    remove(k) {
        localStorage.removeItem(k);
    }
}

/**
 * 浏览器缓存公共方法
 */
export const sstorage = {
    get(k) {
        return sessionStorage.getItem(k);
    },
    set(k,v) {
        sessionStorage.setItem(k, v);
    },
    remove(k) {
        sessionStorage.removeItem(k);
    }
}

/**
 * 注销
 * @param cb
 */
export function logout(cb) {
    storage.remove('token');
    storage.remove('user');
    typeof cb === 'function' && cb();
}

/**
 * mock服务器请求地址
 */
export const url = {
    dev: 'http://localhost:7300/mock/5ed614a45da99657a4540e20'
}
