import React, { useState, useEffect } from "react";
import axios from "axios";

function AudioAPI() {
    const [birdSounds, setBirdSounds] = useState(null);

    // const speciesList = ["American Robin",  "Blue Jay", "Great Horned Owl", "Northern Cardinal", "Northern Flicker", ]

    useEffect(() => {
        const fetchBirdSounds = async () => {
            try {
            const speciesList = ["American Robin",  "Blue Jay", "Great Horned Owl", "Northern Cardinal", "Northern Flicker", ]
                const promises = speciesList.map(async species => {
                    const response = await axios.get(`https://xeno-canto.org/api/2/recordings?query=${encodeURIComponent(species)}+q:A`);
                    return response.data.recordings[0];
                });
                const birdSoundsData = await Promise.all(promises);
                setBirdSounds(birdSoundsData);

            } catch (error) {
                console.error('Error fetchng data:', error)
            }
        };
        fetchBirdSounds();
    }, []); // runs once when the component mounts

    function playSound(url) {
        const audio = new Audio(url);
        audio.play();
    };

    if (birdSounds === null || birdSounds.length === 0) {
        return <div>Loading...</div>
    }
    
    return (
        <div>
            <h1>Bird Calls</h1>
            <ul>
                {birdSounds.map(sound => (
                    <li key={sound.id}>
                        <div>Species: {sound.en}</div>
                        <div>Country: {sound.cnt}</div>
                        <div>
                            URL: <button onClick={() => playSound(sound.file)}>Listen</button>
                        </div>
                        <div>License: <a href={sound.lic}>CC BY-NC-SA 4.0</a></div>
                    </li>
                ))}
            </ul>
        </div>
        

        
    )
}

export default AudioAPI;