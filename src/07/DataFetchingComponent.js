import React, {Suspense} from 'react';
import createResource from "../06/createResource";
import * as PropTypes from "prop-types";

const fetchData = (id) => fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then(res => res.json());

const PostResource = (id) => createResource(() => fetchData(id));

const DataFetchingComponent = ({id}) => {
    const post = PostResource(id).read();
    return (
        <div>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
        </div>
    );
};

function SuspenseList(props) {
    return null;
}

SuspenseList.propTypes = {
    tail: PropTypes.string,
    revealOrder: PropTypes.string,
    children: PropTypes.node
};

const SuspenseListComponent = () => {
    return (
        <SuspenseList revealOrder="forwards" tail="collapsed">
            <Suspense fallback={<h2>Loading post 1...</h2>}>
                <DataFetchingComponent id={1}/>
            </Suspense>
            <Suspense fallback={<h2>Loading post 2...</h2>}>
                <DataFetchingComponent id={2}/>
            </Suspense>
            <Suspense fallback={<h2>Loading post 3...</h2>}>
                <DataFetchingComponent id={3}/>
            </Suspense>
        </SuspenseList>
    );
};

export default SuspenseListComponent;
