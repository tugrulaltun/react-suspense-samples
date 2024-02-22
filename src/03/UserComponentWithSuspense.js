import React, {Suspense} from "react";
import ErrorBoundary from "./ErrorBoundary";

const fetchData = url => {
    let status = 'pending';
    let result;
    let suspender = fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            status = 'success';
            result = data;
        })
        .catch(error => {
            status = 'error';
            result = error;
        });

    return {
        read() {
            if (status === 'pending') throw suspender;
            if (status === 'error') throw result;
            if (status === 'success') return result;
        }
    };
};

const userDataResource = fetchData('https://api.github.com/users/tugrulaltun');

function UserComponentWithSuspense() {
    const user = userDataResource.read();
    return (
        <div>
            <h1>{user.name}</h1>
            <p>{user.bio}</p>
            <img src={user.avatar_url} alt={`Avatar of ${user.name}`} style={{width: 100, borderRadius: '50%'}}/>
        </div>
    );
}

function App() {
    return (
        <ErrorBoundary>
            <Suspense fallback={<div>Loading...</div>}>
                <UserComponentWithSuspense/>
            </Suspense>
        </ErrorBoundary>
    );
}
