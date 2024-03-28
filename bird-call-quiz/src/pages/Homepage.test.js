import React from "react";
import { render } from "@testing-library/react";
import Homepage from "./Homepage.js";

it("renders without crashing", function() {
  render(<Homepage />);
});