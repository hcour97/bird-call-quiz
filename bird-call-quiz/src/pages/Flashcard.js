import React, { useState, useRef, useEffect } from "react";
import AudioAPI from "./AudioAPI";

import "./flashcard.css";

function Flashcard({ birdSpecies, onNext }) {
    console.debug("Flashcard", "birdSpecies=", birdSpecies);

   const audioRef = useRef(null);  // useRef() is a React Hook that lets you reference the value that is not needed for rendering.
   const flipTimeoutRef = useRef();
   const [isFlipped, setIsFlipped] = useState(false);
   const [nextCard, setNextCard] = useState(null);

   // useEffect to reset flip state when the flashcard changes
   useEffect(() => {
    if (nextCard) {
        setIsFlipped(false);
        clearTimeout(flipTimeoutRef.current);
        flipTimeoutRef.current = setTimeout(() => {
            onNext();
        }, 100); // ensure card is fully rendered before flipping
    }

   }, [nextCard, onNext]);
    
    function playBirdCall(url) {
        console.debug("playBirdCall", "birdSpecies=", birdSpecies);
        // event.stopPropagation(); // event does not exist anymore // stops the card from flipping when play button is pressed.
        const newAudio = new Audio(url);
        audioRef.current = newAudio;
        newAudio.play();
        setTimeout(() => {
            if (audioRef.current) {
                console.log("audio in 5s timeout loop now");
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        }, 5000);

    }

    function handleFlip(event) {
        if (!event.target.classList.contains('play-button')) {
            setIsFlipped(!isFlipped);
        }
    }

    const handleNextCard = () => {
        console.debug("Flashcard", "handleNextCard", "onNext")
            onNext();
        } 
    
    return (
        <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
            <div className = "flashcard-inner">
                
                <div className="flashcard-front" >
                    <AudioAPI birdSpecies={birdSpecies} playBirdCall={playBirdCall} />
                </div>
                <div className="flashcard-back">
                    {birdSpecies}
                    <button className="next-card-btn" onClick={handleNextCard}>Next Card</button>
                </div>
            </div>
        </div>
    )
}

export default Flashcard;