import React from "react";
import { useNavigate } from "react-router-dom";
import dancingbirds from "../images/dancingbirds.gif";

function GameOver({ currentScore, highestScore }) {
    let navigate = useNavigate();

    function navigateToHomepage() {
        navigate("/");
    }

    function handleReplay() {
        navigate(0); // refreshes
    }
    return (
        <div className="gameover">
            {console.log("currentScore=", currentScore, "highestScore=", highestScore)}
            
            {currentScore === highestScore ? (
                <div>
                    <p>Congratulations, you beat your highscore!</p>
                    <img src={dancingbirds} alt="dancingbirds" />
                </div>
            ) : (
                <div>
                    <p>Sorry, you did not beat your highscore of {highestScore} this time.</p>
                    <h2>You scored: {currentScore}</h2>
                </div>
            )}         
            <button onClick={navigateToHomepage}>New Quiz</button>
            <button onClick={handleReplay}>Replay</button>
        </div>
    )
}

export default GameOver;