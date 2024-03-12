import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {shuffle} from "../helpers";

import { backyardBirds, eastern, western } from "../common/birdSpecies";
import Flashcard from "./Flashcard";
import GameOver from "../pages/GameOver";

function FlashcardList() {
    console.debug("FlashcardList")

    const location = useLocation();
    const [region, setRegion] = useState(backyardBirds);
    const [birdSpecies, setBirdSpecies] = useState(null);
    
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const regionParam = searchParams.get('region');
        if (regionParam) {
            setRegion(regionParam);
        }
        if (region === "eastern") {
        setBirdSpecies(eastern);
        }

        if (region === "western") {
            setBirdSpecies(western);
        }

        if (region === "backyard birds") {
            setBirdSpecies(backyardBirds);
        }
    }, [location]);

    

    function handleNextCard() {
        if (currentCardIndex < birdSpecies.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
        } else {
            setGameOver(true);
        }
    }

    return (
        <div className="FlashcardList">
            <div className="flashcard-container">
                {console.log("FlashcardList", "birdSpecies=", birdSpecies[currentCardIndex])} 
                {!gameOver && (
                    <Flashcard birdSpecies={birdSpecies[currentCardIndex]} onNext={handleNextCard} />
                )}
                {gameOver && <GameOver />}
            </div>
        </div>
    );
}

export default FlashcardList;