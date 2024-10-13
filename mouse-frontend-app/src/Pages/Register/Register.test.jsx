import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Register from "./Register";
import "@testing-library/jest-dom";
import { describe, test, expect } from "@jest/globals";

describe("Register", () => {
  test("renders Register with title and button", () => {
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
