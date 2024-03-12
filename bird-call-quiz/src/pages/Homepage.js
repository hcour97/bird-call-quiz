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
            <label htmlFor="location">Choose a region in the United States:</label>
            <select name="location" id="location" onChange={handleChange}>
              <option value="northeast">Northeast</option>
              <option value="southwest">Southwest</option>
              <option value="west">West</option>
              <option value="southeast">Southeast</option>
              <option value="midwest">Midwest</option>
            </select>
            Ready to name that Bird Call?
            <button type="submit" className="link">Start</button>
        </form>
        <p>
          
        </p>
      </header>
    </div>
    )
}

export default Homepage;