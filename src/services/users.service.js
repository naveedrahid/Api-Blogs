import { apiService } from "./api.service"

const userServiceUrl = {
    login:'/login',
    register:'/register',
    getUsers:'/users',
    categoryUrl:'/categories',
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
    const response = apiService.get(userServiceUrl.getUsers, data);
    return response;
}
const getCategories = async (data) => {
    const response = apiService.get(userServiceUrl.categoryUrl, data);
    return response;
}

export const UserService = {
    login,
    register,
    getUsers,
    getCategories,
}