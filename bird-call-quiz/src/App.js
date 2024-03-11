import React from "react";
import { BrowserRouter } from "react-router-dom";
import './App.css';

import AppRoutes from "./AppRoutes";
import AudioAPI from "./pages/AudioAPI";

function App() {
  console.debug("App");

  return (
    <BrowserRouter>
        <div className="App">
              <AppRoutes />
        </div>
    </BrowserRouter>
  );
}

export default App;
