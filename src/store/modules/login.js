import {getTk, login, logout} from '@/api/httpService'
import {setToken, getToken, setUser, getUser, removeAll} from "../../api/auth";

const myLogin = {
    state: {
        token: getToken(),
        user: getUser()
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
        },
        SET_USER(state, user) {
            state.user = user;
        },
        CLEAR_BOTH(state) {
            state.user = '';
            state.token = '';
        }
    },
    actions: {
        toLogin({commit}, form) {
            return new Promise((resolve, reject)=>{
                getTk(form.user, form.password).then(res=>{
                    const resData = res.data;
                    if (resData.code === 200){
                        commit('SET_TOKEN', resData.token);
                        setToken(resData.token);
                        resolve({
                            token: resData.token,
                            code: 200
                        });
                    }else {
                        reject({
                            code: 909
                        });
                    }
                })
            })
        },
        Login({commit}, tk) {
            return new Promise((resolve, reject)=>{
                login(tk).then(res=>{
                    const resData = res.data;
                    if (resData.code === 200){
                        commit('SET_USER', resData.user);
                        setUser(resData.user);
                        resolve();
                    }
                }).catch(error=>{
                    reject(error);
                })
            })
        },
        Logout({commit}, tk) {
            return new Promise((resolve, reject)=>{
                logout(tk).then(res=>{
                    const resData = res.data;
                    if (resData.code === 200){
                        commit('CLEAR_BOTH');
                        removeAll();
                        resolve();
                    }
                }).catch(error=>{
                    reject(error);
                })
            })
        }
    }
}

export default myLogin