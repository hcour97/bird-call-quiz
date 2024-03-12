import React, { useState } from "react";
import Flashcard from "./Flashcard";

function FlashcardList() {
    console.debug("FlashcardList")
    
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const birdSpecies = ["american robin", "Blue Jay", "Barn Owl", "Northern Cardinal", "Northern Flicker"];

    function handleNextCard() {
        setCurrentCardIndex(currentCardIndex + 1);
    }

    return (
        <div className="FlashcardList">
            <div className="flashcard-container">
                {console.log("FlashcardList", "birdSpecies=", birdSpecies[currentCardIndex])} 
                {currentCardIndex < birdSpecies.length && (
                    <Flashcard birdSpecies={birdSpecies[currentCardIndex]} onNext={handleNextCard} />
                )}
            </div>
        </div>
    );
}

export default FlashcardList;