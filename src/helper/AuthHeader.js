import { AuthenticationService } from 'services/AuthenticationService';

const AuthHeader = () => {
    // return authorization header with jwt token
    const currentUser = AuthenticationService.currentUserValue;
    if (currentUser && currentUser.token) {
        return {
            Authorization: `Bearer ${currentUser.token}`
        };
    } else {
        return {};
    }
}

export default AuthHeader;