// StartPage.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import StartPage from "./StartPage";
import { enterPath, registrationPath } from "../../Constants/Paths";
import "@testing-library/jest-dom";

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
