import React from "react";
import { render } from "@testing-library/react";
import Flashcard from "./Flashcard";

it("matches snapshot", function () {
  let bird = { species: "American Robin" };
  const { asFragment } = render(
        <Flashcard birdSpecies={ bird } />
  );
  expect(asFragment()).toMatchSnapshot();
});