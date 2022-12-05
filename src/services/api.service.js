import {create} from 'apisauce';
import { unAuthenticatedRoutesConstant, userInfo } from '../util/constant';
import AuthService from '../util/auth.service'


const apiInstance = create({
    baseURL: process.env.REACT_APP_API_URL,
});

const get = (url, queryParam, config) => {
    const response =  apiInstance.get(url, queryParam,config);
    return handleResponse(response);
}
const post = (url, data, config) => {
    const response =  apiInstance.post(url, data,config);
    return handleResponse(response);
}
const put = (url, data, config) => {
    const response =  apiInstance.put(url, data,config);
    return handleResponse(response);
}
const patch = (url, data, config) => {
    const response =  apiInstance.patch(url, data,config);
    return handleResponse(response);
}
const deleteRequest = (url, data, config) => {
    const response =  apiInstance.delete(url, data,config);
    return handleResponse(response);
}

const handleResponse = (response) =>{
    if(response.status === 401){
        localStorage.removeItem(userInfo.TOKEN);
        localStorage.removeItem(userInfo.USERNAME);
        window.location.href = unAuthenticatedRoutesConstant.Login;
    }
    return response;
}

apiInstance.addRequestTransform( (request) => {
    if (AuthService.getTokenExist()) {
        request.headers["Authorization"] = `Bearer ${AuthService.getTokenExist()}`;
    }
});

export const apiService = {
    get,
    post,
    put,
    patch,
    deleteRequest,
}







