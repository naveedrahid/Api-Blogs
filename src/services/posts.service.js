import { apiService } from "./api.service"

const postServicesUrl = {
    url: '/posts',
}

const getAllPosts = async (data) => {
    const response = apiService.get(postServicesUrl.url, data);
    return response;
}

export const postApiMethod = {
    getAllPosts,
}