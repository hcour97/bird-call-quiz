import React from "react";
import { useNavigate } from "react-router-dom";
import dancingbirds from "../images/dancingbirds.gif";
// import sadpenguin from "../images/sad-penguin.jpeg";

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
                <div className="score-container">
                    <p>Congratulations, you beat your highscore!</p>
                    <img src={dancingbirds} alt="dancingbirds" />
                </div>
            ) : (
                <div>
                    {/* <img src={sadpenguin} alt="sadpenguin" /> */}
                    <p>Sorry, you did not beat your highscore of {highestScore} this time.</p>
                    <h2>You scored: {currentScore}</h2>
                </div>
            )}         
            {/* <button className="home-button" onClick={navigateToHomepage}>{'\u2302'}</button> */}
            <button className="button-format" onClick={handleReplay}>Replay</button>
        </div>
    )
}

export default GameOver;