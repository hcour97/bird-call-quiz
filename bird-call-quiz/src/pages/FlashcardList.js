import React from "react";

import bluejay from "../audio/bluejay.mp3";
import americanrobin from "../audio/americanrobin.mp3";
import greathornedowl from "../audio/greathornedowl.mp3";
import northernflicker from "../audio/northernflicker.mp3";
import northerncardinal from "../audio/northerncardinal.mp3";

function FlashcardList() {
    console.debug("FlashcardList")
    let birds = [greathornedowl, northernflicker, americanrobin, bluejay, northerncardinal];
    // is flipped useState to show one side (kind of like the applied feature)

    function playBirdCall(bird) {
        console.debug("playBirdCall", "bird=", bird);
        new Audio(bird).play();
    }
    return (
        <div className="FlashcardList">
            { birds.map(bird => (
                <button onClick={() => playBirdCall(bird)}>Play Call</button>
            )) }
            
        </div>
    )
}

export default FlashcardList;