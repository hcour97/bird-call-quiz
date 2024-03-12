import React from "react";
import { Link } from "react-router-dom";
import "./homepage.css";
import birdnerd from "../images/birdnerd.png";

function Homepage() {
    console.debug("Homepage")

    function handleStart() {
        console.log("user clicked start --> '/quiz'.")
      }
    
    return (
    <div className="homepage">
      <header className="homepage-header">
        <img src={birdnerd} className="homepage-logo" alt="logo" />
        <p>
          Ready to name that Bird Call?
        </p>
        <button onClick={handleStart}><Link to="/quiz" className="link">Start</Link></button>
      </header>
    </div>)
}

export default Homepage;