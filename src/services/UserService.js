import { API_URL } from 'constants/SiteConfig';

import { HandleResponse } from 'helper/HandleResponse';

import AuthHeader from '../helper/AuthHeader';
import { AuthorizedRequests } from 'utils/AxiosHelper';


//Gets all the users
const getAllUsers = () => {
        
        const requestOptions = {
            method: 'GET',
            headers: AuthHeader()
        };
        return fetch(`${API_URL}/user`, requestOptions).then(HandleResponse);
}

//Gets Current Logged In User Details
const getCurrentUser = () => {
    return AuthorizedRequests.get(`/user/info`)
    .then(response => {
        return response;
    })
    .catch(error => console.log(error));
}


export { getAllUsers, getCurrentUser };