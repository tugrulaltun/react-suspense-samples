import React, {useState, Suspense, useTransition} from 'react';

const RepoList = React.lazy(() => import('./RepoList'));

function SearchComponent() {
    const [query, setQuery] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [isPending, startTransition] = useTransition({timeoutMs: 3000});

    const handleChange = (e) => {
        setInputValue(e.target.value);
        startTransition(() => {
            setQuery(e.target.value);
        });
    };

    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder="Search GitHub repos..."
            />
            <div className={`loader ${isPending ? 'loader-visible' : ''}`}>Loading...</div>

            <Suspense fallback={<div>Loading results...</div>}>
                <RepoList key={query} query={query}/>
            </Suspense>
        </div>
    );
}

export default SearchComponent;
