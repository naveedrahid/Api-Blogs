import { apiService } from "./api.service"

const commentsUrl = {
    url: '/comments'
}

const getAllComments = async (data) =>{
    const response = await apiService.get(commentsUrl.url, data);
    return response;
}
const approvedComments = async (comment_id) =>{
    const response = await apiService.get(`${commentsUrl.url}/approve/${comment_id}`);
    return response;
}
const unApprovedComments = async (comment_id) =>{
    const response = await apiService.get(`${commentsUrl.url}/unapprove/${comment_id}`);
    return response;
}
const deleteCommentsById = async (comment_id) =>{
    const response = await apiService.deleteRequest(`${commentsUrl.url}/${comment_id}`);
    return response;
}

export const commentApiMethod = {
    getAllComments,
    approvedComments,
    unApprovedComments,
    deleteCommentsById
}