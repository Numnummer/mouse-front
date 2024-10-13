import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SignIn from "./SignIn";
import "@testing-library/jest-dom";
import { describe, test, expect } from "@jest/globals";

describe("SignIn", () => {
  test("renders SignIn with title and button", () => {
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );

    // Check if the title is rendered
    const titleElement = screen.getByText(/Трекер Тренировок/i);
    expect(titleElement).toBeInTheDocument();

    // Check if the buttons are rendered
    const registerButton = screen.getByText(/Войти/i);
    expect(registerButton).toBeInTheDocument();
  });
});
