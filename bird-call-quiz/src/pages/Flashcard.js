import React, { useState, useRef, useEffect } from "react";
import AudioAPI from "./AudioAPI";

import "./flashcard.css";

function Flashcard({ birdSpecies, onNext, onCorrect }) {
    console.debug("Flashcard", "birdSpecies=", birdSpecies);

   const audioRef = useRef(null);  // useRef() is a React Hook that lets you reference the value that is not needed for rendering.
   const [isFlipped, setIsFlipped] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [currentAudioUrl, setCurrentAudioUrl] = useState(false);

    
    function playBirdCall(url) {
        console.debug("ORIGINAL FUNCTION playBirdCall", "birdSpecies=", birdSpecies);

        if (url !== currentAudioUrl) {
            if (audioRef.current) {
                audioRef.current.pause();
            }
            setCurrentAudioUrl(url);
            const newAudio = new Audio(url);
            audioRef.current = newAudio;
            newAudio.play();
        }
    }

    function handleFlip(event) {
        if (!event.target.classList.contains('play-button')) {
            setIsFlipped(!isFlipped);
        }
    }

    // useEffect(() => {
    //     if (!isLoading) {
    //         setIsFlipped(false);
    //     }
    // }, [isLoading]);

    const handleNextCard = () => {
        console.debug("Flashcard", "handleNextCard", "onNext")
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            onNext();
        }, 1000)
    } 
    
    useEffect(() => {
        if (isFlipped && audioRef.current) {
            audioRef.current.pause()
        }
    }, [isFlipped]);
    
    return (
        <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
                <div className = "flashcard-inner">
                    <div className="flashcard-front" >
                        <AudioAPI birdSpecies={birdSpecies} playBirdCall={playBirdCall} />
                    </div>
                    <div className={`flashcard-back ${isLoading ? 'hidden' : ''}`}>
                        {birdSpecies}
                        {/* <button className="next-card-btn" onClick={handleNextCard}>Next Card</button> */}
                        <button className="correct-answer" onClick={() => {handleNextCard(); onCorrect();}}>{'\u2705'}</button>
                        <button className="incorrect-answer" onClick={handleNextCard}>{'\u274c'}</button>

                    </div>
                </div>

        </div>
    )
}

export default Flashcard;