import React from "react";
import { render } from "@testing-library/react";
import FlashcardList from "./FlashcardList.js";

it("renders without crashing", function() {
  render(<FlashcardList />);
});

it("matches snapshot with no jobs", function() {
  const { asFragment } = render(<FlashcardList />);
  expect(asFragment()).toMatchSnapshot();
});