import React, {Suspense} from 'react';
import {createResource} from './useFetch';
import {SuspenseImage} from './SuspenseImage';

const userDataResource = createResource(() => fetch('https://api.github.com/users/tugrulaltun').then(res => res.json()));

const UserProfile = () => {
    const user = userDataResource.read();
    return (
        <div>
            <h1>{user.name}</h1>
            <SuspenseImage src={user.avatar_url} alt="User Avatar" style={{width: 100, height: 100}}/>
        </div>
    );
};

const UseProfileCustomHookComponent = () => (
    <Suspense fallback={<div>Loading profile...</div>}>
        <UserProfile/>
    </Suspense>
);

export default UseProfileCustomHookComponent;
