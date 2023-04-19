import axios from "axios"
import { baseUrl } from "."

export const authApiLogin = async (email, password, onCompleted) => {
    let url =  baseUrl + "/Authentication/Login";

    let response = null;
    try {
        response = await axios.post(url, {email, password});
        
    } catch(err) {
        console.log('err = ', err)
    }

    return onCompleted(response);
}

export const authApiRegister = async (userInfo, onCompleted) => {
    let url =  baseUrl + "/Authentication/Register";

    let response = null;
    try {
        response = await axios.post(url, userInfo);
        
    } catch(err) {
        console.log('err = ', err)
    }

    return onCompleted(response);
}