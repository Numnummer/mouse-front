// StartPage.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import StartPage from "./StartPage";
import "@testing-library/jest-dom";
import { describe, test, expect } from "@jest/globals";

describe("StartPage", () => {
  test("renders StartPage with title and buttons", () => {
    render(
      <MemoryRouter>
        <StartPage />
      </MemoryRouter>
    );

    // Check if the title is rendered
    const titleElement = screen.getByText(/трекер тренировок/i);
    expect(titleElement).toBeInTheDocument();

    // Check if the buttons are rendered
    const registerButton = screen.getByText(/регистрация/i);
    const loginButton = screen.getByText(/вход/i);
    expect(registerButton).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });
});
