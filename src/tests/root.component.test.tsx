import { render, screen } from "@testing-library/react";
import { expect } from "vitest";
import Root from "../root.component";
import React from "react";

describe("Root component", () => {
  it("should be in the document", () => {
    render(<Root pageLabel="Calendar" />);
    expect(screen.getByText("Calendar")).toBeInTheDocument();
  });
});
