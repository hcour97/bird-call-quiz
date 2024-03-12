import React from "react";
import flyingbirds from "../images/flyingbirds.gif";

import "./loadingpage.css";

function LoadingPage() {
    return (
        <div className="loading-container">
            <p>Loading...</p>
            <img className="loading-image" src={flyingbirds} alt="flying birds" />
        </div>
    )
}

export default LoadingPage;