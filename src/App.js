import './App.css';
import AsyncHeavyComponent from "./01/AsyncHeavyComponent";
import AsyncFetchComponent from "./01/AsyncFetchComponent";
import UserProfileErrorBoundary from "./02/UserProfile";
import SearchComponent from "./04/SearchComponent";
import SuspenseImage from "./05/SuspenseImage";
import UserProfileResource from "./06/UserProfile";
import * as PropTypes from "prop-types";
import SuspenseListComponent from "./07/DataFetchingComponent";
import UseProfileCustomHookComponent from "./08/UserProfileCustomHookComponent";
import DelayedSuspenseComponent from "./09/DelayedSuspenseComponent";

function SuspenseList(props) {
    return null;
}

SuspenseList.propTypes = {
    tail: PropTypes.string,
    revealOrder: PropTypes.string,
    children: PropTypes.node
};

function App() {
    return (
        <>
            <AsyncHeavyComponent/>
            <AsyncFetchComponent/>
            <UseProfileCustomHookComponent/>
            <DelayedSuspenseComponent/>
            <UserProfileErrorBoundary/>
            <UserProfileResource/>
            <SuspenseListComponent/>
            <SearchComponent/>
            <SuspenseImage src="https://images.pexels.com/photos/668353/pexels-photo-668353.jpeg"
                           alt="High resolution"/>
        </>
    );
}

export default App;
