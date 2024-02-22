import React, {Suspense} from 'react';

const imageCache = new Map();

function preloadImage(src) {
    if (imageCache.has(src)) {
        return imageCache.get(src);
    }
    let suspender = new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            imageCache.set(src, 'loaded');
            resolve('loaded');
        };
        img.onerror = reject;
        img.src = src;
    });
    imageCache.set(src, suspender);
    return suspender;
}

const SuspenseImageComponent = ({src, alt}) => {
    const status = preloadImage(src);
    if (status !== 'loaded') {
        throw status;
    }
    return <img src={src} alt={alt} width="400px" height="600px"/>;
};

const SuspenseImage = ({src, alt}) => (
    <Suspense fallback={<div>Loading image...</div>}>
        <SuspenseImageComponent src={src} alt={alt}/>
    </Suspense>
);

export default SuspenseImage;
