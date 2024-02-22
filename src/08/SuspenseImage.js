import React from 'react';
import {createResource} from './useFetch';

const imgResourceCache = {};

const preloadImage = (src) => {
    if (!imgResourceCache[src]) {
        imgResourceCache[src] = createResource(() => new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(src);
            img.onerror = reject;
            img.src = src;
        }));
    }
    return imgResourceCache[src];
};

export const SuspenseImage = ({src, alt, ...props}) => {
    const resource = preloadImage(src);
    resource.read();
    return <img src={src} alt={alt} {...props} />;
};
