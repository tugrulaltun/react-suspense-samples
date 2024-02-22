import React, {useState, useTransition} from 'react';
import DelayedSuspense from './DelayedSuspense';
import fetchData from "./fetchData";

const UserProfile = React.lazy(() => import('./UserProfile'));

const DelayedSuspenseComponent = () => {
    const [userId, setUserId] = useState(1);
    const [resource, setResource] = useState(() => fetchData(userId));

    const [isPending, startTransition] = useTransition({
        timeoutMs: 3000
    });

    const handleFetchUser = (userId) => {
        startTransition(() => {
            setResource(fetchData(userId));
        });
    };

    return (
        <div>
            <button onClick={() => handleFetchUser(1)}>Load User 1</button>
            <button onClick={() => handleFetchUser(2)}>Load User 2</button>
            <DelayedSuspense fallback={<div>Loading user...</div>} delay={500}>
                <UserProfile resource={resource}/>
            </DelayedSuspense>
            {isPending && <div>Updating...</div>}
        </div>
    );
};

export default DelayedSuspenseComponent;
