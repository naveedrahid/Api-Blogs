import { apiService } from "./api.service"

const userServiceUrl = {
    login:'/login',
    register:'/register',
    url:'/users',
}

const login = async (data) => {
    const response = apiService.post(userServiceUrl.login, data);
    return response;
}

const register = async (data) => {
    const response = apiService.post(userServiceUrl.register, data);
    return response;
}
const getUsers = async (data) => {
    const response = apiService.get(userServiceUrl.url, data);
    return response;
}
const deleteUsers = async (user_id) => {
    const response = apiService.deleteRequest(`${userServiceUrl.url}/${user_id}`);
    return response;
}

export const UserService = {
    login,
    register,
    getUsers,
    deleteUsers,
}