import React from "react";
import { render } from "@testing-library/react";
import GameOver from "./GameOver.js";

it("renders without crashing", function() {
  render(<GameOver />);
});