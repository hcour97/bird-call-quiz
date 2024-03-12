import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Flashcard from "./Flashcard";
import {shuffle} from "../helpers";

import GameOver from "../pages/GameOver";

function FlashcardList() {
    console.debug("FlashcardList")

    const location = useLocation();
    const [region, setRegion] = useState("");
    
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const regionParam = searchParams.get('region');
        if (regionParam) {
            setRegion(regionParam);
        }
    }, [location]);

    const birdSpecies = shuffle(["american robin", "Blue Jay", "Barn Owl", "Northern Cardinal", "Northern Flicker"]);

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