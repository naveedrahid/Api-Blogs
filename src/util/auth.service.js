import { userInfo } from "./constant";

function isTokenExist() {
    const token = localStorage.getItem(userInfo.TOKEN);
    if (token) {
        return token;
    }
    return false;
}

function getUserName() {
    const username = localStorage.getItem(userInfo.USERNAME);
    if (username) {
        return username;
    }
    return null;
}
function getTokenExist(){
    const token = localStorage.getItem(userInfo.TOKEN);
    if (token) {
        return token;
    }
    return null;
}
const AuthService = {
    isTokenExist,
    getUserName,
    getTokenExist,
};

export default AuthService;