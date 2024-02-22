import React, {Suspense} from 'react';
import createResource from './createResource';

const fetchUserData = () => {
    return fetch('https://jsonplaceholder.typicode.com/users/1')
        .then(response => response.json());
};

const userResource = createResource(fetchUserData);

const UserProfile = () => {
    const user = userResource.read();
    return (
        <div>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
        </div>
    );
};

// App component
const UserProfileResource = () => (
    <Suspense fallback={<div>Loading user...</div>}>
        <UserProfile/>
    </Suspense>
);

export default UserProfileResource;
