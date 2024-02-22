import React from 'react';
import fetchData from "./fetchData";

const RepoList = ({query}) => {
    const repoResource = query ? fetchData(`https://api.github.com/search/repositories?q=${query}`) : null;
    const Repos = () => {
        if (!query) return <div>Enter a search term to start.</div>;
        const repos = repoResource.read();

        return (
            <ul>
                {repos.items.map(repo => (
                    <li key={repo.id}>{repo.name} - Stars: {repo.stargazers_count}</li>
                ))}
            </ul>
        );
    };

    return (
        <React.Suspense fallback={<div>Loading repositories...</div>}>
            <Repos/>
        </React.Suspense>
    );
};

export default RepoList;
