import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./homepage.css";
import birdnerd from "../images/birdnerd.png";

function Homepage() {
    console.debug("Homepage");
    const navigate = useNavigate();
    const [region, setRegion] = useState("");

    function handleChange(event) {
        setRegion(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(`user chose region ${region}`)
        setRegion(event.target.value);
        navigate(`/quiz?region=${region}`);
      }
    
    return (
    <div className="homepage">
      <header className="homepage-header">
        <img src={birdnerd} className="homepage-logo" alt="logo" />
        <form className="location-form" onSubmit={handleSubmit}>
          <div className="select-container">
            <label htmlFor="location">Choose a region: </label>
            <select name="location" id="location" onChange={handleChange}>
              <option value="backyardBirds">Backyard Birds</option>
              <option value="eastern">Eastern</option>
              <option value="western">Western</option>
            </select>
            </div>
  
            <button type="submit" className="button-format">Start</button>
        </form>

      </header>
    </div>
    )
}

export default Homepage;