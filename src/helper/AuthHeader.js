import { AuthenticationService } from 'services/AuthenticationService';

const AuthHeader = () => {
    // return authorization header with jwt token
    const currentUser = AuthenticationService.currentUserValue;
    if (currentUser && currentUser.accessToken) {
        let Header = {
            'Authorization': `Bearer ${currentUser.accessToken}`,
            'Access-Control-Allow-Origin': '*'
        };
        return Header;
    } else {
        return {};
    }
}

export default AuthHeader;