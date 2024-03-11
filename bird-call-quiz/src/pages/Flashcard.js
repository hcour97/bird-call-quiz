import React, { useState, useRef, useEffect } from "react";

import "./flashcard.css";

function Flashcard({ bird, onNext }) {
    console.debug("Flashcard");
    // is flipped useState to show one side

    // setAudio taking too long to setState, therefore audio never times out 
    //const [audio, setAudio] = useState(null);

    // useRef() is a React Hook that lets you reference the value that is not needed for rendering.

   const audioRef = useRef(null);
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
    
    function playBirdCall(event) {
        console.debug("playBirdCall", "bird=", bird);
        event.stopPropagation(); // stops the card from flipping when play button is pressed.
        const newAudio = new Audio(bird.audio);
        audioRef.current = newAudio;
        newAudio.play();
        setTimeout(() => {
            if (audioRef.current) {
                console.log("audio in timeout loop now");
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        }, 5000);
    }

    function handleFlip() {
        setIsFlipped(!isFlipped);
    }

    const handleNextCard = (event) => {
        event.stopPropagation(); // stop from displaying the backside of the nextcard
        if (bird && bird.name) {
            setNextCard(true);
        } 
    }

    return (
        <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
            <div className = "flashcard-inner">
                <div className="flashcard-front" >
                    <button onClick={playBirdCall}> {'\u25B6'} </button>
                </div>
                <div className="flashcard-back">
                    {bird.name}
                    <button className="next-card-btn" onClick={handleNextCard}>Next Card</button>
                </div>
            </div>
        </div>
    )
}

export default Flashcard;