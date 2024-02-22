import React, {Suspense} from 'react';

function fetchData() {
    let status = 'pending';
    let result;
    let suspender = fetch('https://api.github.com/users/tugrulaltun')
        .then(response => response.json())
        .then(data => {
            status = 'success';
            result = data;
        }, error => {
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
}

const myData = fetchData();

function FetchComponent() {
    const data = myData.read();
    return (
        <div>
            <h2>{data.name}</h2>
            <p>{data.bio}</p>
            <img src={data.avatar_url} alt={`Avatar of ${data.name}`} style={{width: 100, borderRadius: '50%'}}/>
        </div>
    );
}

function AsyncFetchComponent() {
    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            <FetchComponent/>
        </Suspense>
    );
}

export default AsyncFetchComponent;
