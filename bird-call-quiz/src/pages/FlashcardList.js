import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import {shuffle} from "../helpers";
import "./style-pages.css";

import { backyardBirds, eastern, western } from "../common/birdSpecies";
import Flashcard from "./Flashcard";
import GameOver from "./GameOver";

function FlashcardList() {
    console.debug("FlashcardList");

    const navigate = useNavigate();
    const location = useLocation();

    const [region, setRegion] = useState("backyardBirds"); // default state
    const [birdSpecies, setBirdSpecies] = useState(null);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [currentScore, setCurrentScore] = useState(0);
    const [highestScore, setHighestScore] = useState(0);

    // get quiz region from URL params
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const regionParam = searchParams.get('region');
        if (regionParam) {
            setRegion(regionParam);
        }
    }, [location]);

    // find appropriate bird species list based on the selected region
    useEffect(() => {
        console.debug("birdSpecies List=", birdSpecies);
        switch (region) {
            case "eastern":
                setBirdSpecies(eastern);
                break;
            case "western":
                setBirdSpecies(western);
                break;
            case "backyardBirds":
            default:
                setBirdSpecies(backyardBirds);
                break;
        }
    }, [birdSpecies, region]);

    useEffect(() => {
        // on component mount, retrieve highest score from localStorage
        const storedHighestScore = localStorage.getItem('highestScore');
        if (storedHighestScore !== null) {
            setHighestScore(parseInt(storedHighestScore));
        }
    }, []);

// update highest score in localStorage if current score beats it
    useEffect(() => {
        if (currentScore > highestScore) {
            localStorage.setItem('highestScore', currentScore.toString());
            setHighestScore(currentScore);
        }
    }, [currentScore, highestScore]);

    function handleCorrectAnswer() {
        setCurrentScore(currentScore + 10);
    }
    // move onto the next card, when no cards left, game over!
    function handleNextCard() {
        if (currentCardIndex < birdSpecies.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
        } else {
            setGameOver(true);
        }
    }

    function toHomepage() {
        navigate("/");
    }

    return (
        <div className="FlashcardList">
            <div className="flashcard-container">
            <button className="button-format" onClick={toHomepage}>{'\u2302'}</button>
                {birdSpecies !== null && (
                    console.log("FlashcardList", "birdSpecies=", birdSpecies[currentCardIndex]),
                    !gameOver && (
                        <div>
                            <div className="score-container">
                                <h3 className="currentScore">current score: {currentScore}</h3>
                                <h3 className="highScore">high score: {highestScore}</h3>
                            </div>
                            <Flashcard birdSpecies={birdSpecies[currentCardIndex]} onNext={handleNextCard} onCorrect={handleCorrectAnswer} />
                        </div>
                    )
                )}
                {gameOver && <GameOver currentScore={currentScore} region={region} highestScore={highestScore}/>}
            </div>
        </div>
    );
}

export default FlashcardList;