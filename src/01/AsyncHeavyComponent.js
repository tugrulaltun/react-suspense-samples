import React, {Suspense} from 'react';

const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

function AsyncHeavyComponent() {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <HeavyComponent/>
            </Suspense>
        </div>
    );
}

export default AsyncHeavyComponent;
