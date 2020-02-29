import axios from 'axios';
import {
    API_URL
} from 'constants/SiteConfig';
 

const AuthorizedRequests = axios.create({
    baseURL: API_URL,
    timeout: 5000,
    headers: {
        'Access-Control-Allow-Origin': '*'
    } 
})
    if(localStorage.getItem("currentUser") !== null)
        AuthorizedRequests.defaults.headers.common['Authorization'] = 'Bearer ' + JSON.parse(localStorage.getItem("currentUser")).accessToken;    
export { AuthorizedRequests };