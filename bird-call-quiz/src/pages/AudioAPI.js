import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingPage from "../common/LoadingPage";

function AudioAPI({ birdSpecies, playBirdCall }) {
    console.debug("Audio API", "birdSpecies=", birdSpecies);
    const [birdSound, setBirdSound] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.debug("fetchBirdCall with localStorage")
        const fetchBirdCall = async () => {
            try {
                // check if data is cached in localstorage, if it is use it
                const cachedData = localStorage.getItem(birdSpecies);
                if (cachedData) {
                    setBirdSound(JSON.parse(cachedData));
                    setLoading(false);
                } else {
                    // if it's not, get it from the API, then cache it to local storage
                    const response = await axios.get(`https://xeno-canto.org/api/2/recordings?query=${encodeURIComponent(birdSpecies)}+q:A`);
                    const recording = response.data.recordings[0];

                    localStorage.setItem(birdSpecies, JSON.stringify(recording));
                    console.log("recording=", recording);
                    setBirdSound(recording);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError("Error fetching bird call");
                setLoading(false);
            }
        };
        fetchBirdCall();
    }, [birdSpecies]);


    if (loading) {
        return (
            <LoadingPage />
        )
    }

    if (error) {
        return <div>{error}</div>
    }

    if (!birdSound) {
        return <div>No bird sound found.</div>
    }
    
    return (
        <div>
                <div key={birdSound.id}>
                    <div>
                        <button className="play-button" onClick={() => playBirdCall(birdSound.file)}>{'\u25B6'}</button>
                    </div>
                </div>
        </div> 
    )
}

export default AudioAPI;