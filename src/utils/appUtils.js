export const getToken = () => {
    return localStorage.getItem("user_token");
}

export const setToken = (token) => {
    return localStorage.setItem("user_token", token);
}

export const clearToken = (token) => {
    return localStorage.removeItem("user_token");
}