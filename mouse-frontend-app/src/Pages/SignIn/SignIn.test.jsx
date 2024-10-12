// StartPage.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import SignIn from "./SignIn";
import { enterPath, registrationPath } from "../../Constants/Paths";
import "@testing-library/jest-dom";

describe("StartPage", () => {
  test("renders StartPage with title and buttons", () => {
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
