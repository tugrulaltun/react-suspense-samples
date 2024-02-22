import React, {useState, useEffect} from 'react';

const fakeDataFetch = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Data loaded");
        }, 3000); // 3 seconds delay to simulate a heavy operation
    });
};

const HeavyComponent = () => {
    const [data, setData] = useState('Loading...');

    useEffect(() => {
        fakeDataFetch().then(data => {
            setData(data);
        });
    }, []);

    return (
        <div>
            <h1>Heavy Component</h1>
            <p>{data}</p>
        </div>
    );
};

export default HeavyComponent;
