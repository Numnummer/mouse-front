// StartPage.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import Register from "./Register";
import { enterPath, registrationPath } from "../../Constants/Paths";
import "@testing-library/jest-dom";

describe("StartPage", () => {
  test("renders StartPage with title and buttons", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    // Check if the title is rendered
    const titleElement = screen.getByText(/Трекер Тренировок/i);
    expect(titleElement).toBeInTheDocument();

    // Check if the buttons are rendered
    const registerButton = screen.getByText(/зарегистрироваться/i);
    const loginButton = screen.getByText(/Я тренер/i);
    expect(registerButton).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });
});
