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
    console.debug("FlashcardList", "region=", region, "birdSpecies=", birdSpecies); 
    // region is returning the array... not the name of the array
    // birdSpecies is returning null
    
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const regionParam = searchParams.get('region');
        if (regionParam) {
            setRegion(regionParam);
        }
    }, [location]);

    useEffect(() => {
        // set bird species based on the selected region
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
                {birdSpecies !== null && (
                    console.log("FlashcardList", "birdSpecies=", birdSpecies[currentCardIndex]),
                    !gameOver && (
                        <Flashcard birdSpecies={birdSpecies[currentCardIndex]} onNext={handleNextCard} />
                    )
                )}
                {gameOver && <GameOver />}
            </div>
        </div>
    );
}

export default FlashcardList;