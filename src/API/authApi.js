import axios from "axios";
import { baseUrl } from "."

export const authApiLogin = (email, password) => {
    return axios.post(`${baseUrl}/Authentication/Login`, { email, password });
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