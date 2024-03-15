import React from "react";
import { BrowserRouter } from "react-router-dom";
import './App.css';

import AppRoutes from "./AppRoutes";

function App() {
  console.debug("App");

  return (
        <BrowserRouter >
          <div className="app-container">
                <AppRoutes />
          </div>
        </BrowserRouter>  
  );
}

export default App;