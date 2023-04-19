import { authType } from "../types/authType"

export const actionSetToken = (token) => {

    console.log("call second === ", token);
    return {
        type: authType.SET_TOTKEN,
        payload: token
    }

}

export const actionLoggedSuccess = (payload) => {

    return {
        type: authType.LOGIN_SUCCESS,
        payload
    }
}

export const actionLoginFail = (payload) => {

    return {
        type: authType.LOGIN_FAIL,
        payload
    }
}

export const actionRegisterSuccess = (payload) => {

    return {
        type: authType.REGISTER_SUCCESS,
        payload
    }
}

export const actionRegisterFail = (payload) => {

    return {
        type: authType.REGISTER_FAIL,
        payload
    }
}