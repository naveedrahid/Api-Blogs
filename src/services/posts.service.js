import { apiService } from "./api.service"

const postServicesUrl = {
    url: '/posts',
}

const getAllPosts = async (data) => {
    const response = apiService.get(postServicesUrl.url, data);
    return response;
}
const addPosts = async (payload) => {
    const response = apiService.post(postServicesUrl.url, payload);
    return response;
}
const ediPosts = async (post_id) => {
    const response = apiService.get(`${postServicesUrl.url}/${post_id}`);
    return response;
}
const updatePosts = async (post_id, payload) => {
    const response = apiService.put(`${postServicesUrl.url}/${post_id}`, payload);
    return response;
}
const deletePosts = async (post_id) => {
    const response = apiService.deleteRequest(`${postServicesUrl.url}/${post_id}`);
    return response;
}

export const postApiMethod = {
    getAllPosts,
    addPosts,
    ediPosts,
    updatePosts,
    deletePosts
}