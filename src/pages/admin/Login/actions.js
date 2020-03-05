import * as Types from './constants';

export const checkLogin = (user) => {
    return {
        type : Types.CHECK_LOGIN,
        user
    }
}

export const loginSuccess = (msg) => {
    return {
        type : Types.LOGIN_SUCCESS,
        msg
    }
}

export const loginFail = (msg) => {
    return {
        type : Types.LOGIN_FAIL,
        msg
    }
}
