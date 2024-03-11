import React, { useState } from "react";
import Flashcard from "./Flashcard";

import americanrobinAudio from "../audio/americanrobin.mp3";
import bluejayAudio from "../audio/bluejay.mp3";
import greathornedowlAudio from "../audio/greathornedowl.mp3";
import northerncardinalAudio from "../audio/northerncardinal.mp3";
import northernflickerAudio from "../audio/northernflicker.mp3";


function FlashcardList() {
    console.debug("FlashcardList")
    
    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    const birds = [
        { name: "American Robin", audio: americanrobinAudio},
        { name: "Blue Jay", audio: bluejayAudio},
        { name: "Great Horned Owl", audio: greathornedowlAudio },
        { name: "Northern Cardinal", audio: northerncardinalAudio },
        { name: "Northern Flicker", audio: northernflickerAudio }
    ];

    function handleNextCard() {
        setCurrentCardIndex(currentCardIndex + 1);
    }

    return (
        <div className="FlashcardList">
            <div className="flashcard-container">
                <Flashcard bird={birds[currentCardIndex]} onNext={handleNextCard} /> 
            </div>
        </div>
    );
}

export default FlashcardList;