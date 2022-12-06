import { apiService } from "./api.service";

const categoryUrl = {
    url: '/categories',
}

const getCategories = async (data) => {
    const response = apiService.get(categoryUrl.url, data);
    return response;
}

const AddCategories = async (payload) => {
    const response = apiService.post(categoryUrl.url, payload);
    return response;
}
const editCategories = async (id) => {
    const response = apiService.get(`${categoryUrl.url}/${id}`);
    return response;
}
const updateCategories = async (id, payload) => {
    const response = apiService.put(`${categoryUrl.url}/${id}`, payload);
    return response;
}

export const CategoryService = {
    getCategories,
    AddCategories,
    editCategories,
    updateCategories,
}