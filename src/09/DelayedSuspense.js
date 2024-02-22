import React, { useState, useEffect } from 'react';

const DelayedSuspense = ({ fallback, delay = 300, children }) => {
    const [showFallback, setShowFallback] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowFallback(true);
        }, delay);

        return () => clearTimeout(timer);
    }, [delay]);

    return <React.Suspense fallback={showFallback ? fallback : null}>{children}</React.Suspense>;
};

export default DelayedSuspense;
