import React from "react";
import dancingbirds from "../images/dancingbirds.gif";

function GameOver() {
    return (
        <div className="gameover">
            <h1>You finished the set!</h1>
            <img src={dancingbirds} alt="dancingbirds" />
        </div>
    )
}

export default GameOver;