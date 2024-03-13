import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {shuffle} from "../helpers";

import { backyardBirds, eastern, western } from "../common/birdSpecies";
import Flashcard from "./Flashcard";
import GameOver from "../pages/GameOver";

function FlashcardList() {
    console.debug("FlashcardList");

    const location = useLocation();

    const [region, setRegion] = useState("backyardBirds"); // default state
    const [birdSpecies, setBirdSpecies] = useState(null);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [currentScore, setCurrentScore] = useState(50);
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
        switch (region) {
            case "eastern":
                setBirdSpecies(shuffle(eastern));
                break;
            case "western":
                setBirdSpecies(shuffle(western));
                break;
            case "backyardBirds":
            default:
                setBirdSpecies(shuffle(backyardBirds));
                break;
        }
    });

    useEffect(() => {
        // on component mount, retrieve highest score from localStorage
        const storedHighestScore = localStorage.getItem('highestScore');
        if (storedHighestScore !== null) {
            setHighestScore(parseInt(storedHighestScore));
        }
    })

    useEffect(() => {
        // update highest score in localStorage if current score beats it
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
        // if the correct answer button was pressed, increase score by 10
            //handleCorrectAnswer();
        } else {
            setGameOver(true);
        }
    }

    return (
        <div className="FlashcardList">
            <div className="flashcard-container">
                
                {birdSpecies !== null && (
                    console.log("FlashcardList", "birdSpecies=", birdSpecies[currentCardIndex]),
                    !gameOver && (
                        <div>
                            <h3>current score: {currentScore}</h3>
                            <h3>highest score: {highestScore}</h3>
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