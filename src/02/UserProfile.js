import React, {Suspense} from "react";
import ErrorBoundary from "./ErrorBoundary";

function createResource(promise) {
    let status = 'pending';
    let result = promise.then(
        data => {
            status = 'success';
            result = data;
        },
        error => {
            status = 'error';
            result = error;
        }
    );

    return {
        read() {
            if (status === 'pending') throw result;
            if (status === 'error') throw result;
            return result;
        },
    };
}

const userResource = createResource(fetch('https://api.github.com/users/tugrulaltun').then(res => res.json()));

const UserProfile = () => {
    const user = userResource.read();
    return (
        <div>
            <h1>{user.name}</h1>
            <p>{user.bio}</p>
            <img src={user.avatar_url} alt={`Avatar of ${user.name}`} style={{width: 100, borderRadius: '50%'}}/>
        </div>
    );
};

function UserProfileErrorBoundary() {
    return (
        <ErrorBoundary>
            <Suspense fallback={<h1>Loading...</h1>}>
                <UserProfile/>
            </Suspense>
        </ErrorBoundary>
    );
}

export default UserProfileErrorBoundary;
