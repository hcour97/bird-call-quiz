import React from "react";
import { Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import FlashcardList from "./pages/FlashcardList";
import Flashcard from "./pages/Flashcard";

function AppRoutes() {
    console.debug("Routes"); 

    return (
        <div>
                <Routes>
                    <Route exact path="/" element={<Homepage />} />
                    <Route exact path="/quiz" element={<FlashcardList />} />
                    <Route exact path="/quiz/card" element={<Flashcard />} />
                </Routes>
        </div>    
    )
}

export default AppRoutes;