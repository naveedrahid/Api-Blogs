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

export const CategoryService = {
    getCategories,
    AddCategories,
}