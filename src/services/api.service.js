import {create} from 'apisauce';
import {notification} from 'antd';
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
const deleteRequest = (url, queryParams, config) => {
    const response =  apiInstance.delete(url, queryParams,config);
    return handleResponse(response);
}

const handleResponse = async (response) =>{
    const checkResponse = await response;
    if(checkResponse.status === 401){
        localStorage.removeItem(userInfo.TOKEN);
        localStorage.removeItem(userInfo.USERNAME);
        window.location.href = unAuthenticatedRoutesConstant.Login;
    }
    if (!checkResponse.ok) {
        notification.info({
            message:`Something went wrong!`,
            placement:"topRight",
        });
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







