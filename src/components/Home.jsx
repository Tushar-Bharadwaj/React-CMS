import React from 'react';

import { AuthenticationService } from 'services/AuthenticationService';
class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthenticationService.currentUserValue,
            users: null
        };
    }

    render() {
        const { currentUser, users } = this.state;
        return (
            <div>
                <h1>Hi {currentUser.firstName}!</h1>
                <p>You're logged in with React & JWT!!</p>
                <h3>Users from secure api end point:</h3>
                {users &&
                    <ul>
                        {users.map(user =>
                            <li key={user.id}>{user.firstName} {user.lastName}</li>
                        )}
                    </ul>
                }
            </div>
        );
    }
}

export default Home;