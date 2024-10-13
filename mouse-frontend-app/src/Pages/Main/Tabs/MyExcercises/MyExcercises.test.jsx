import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MyExcercises from "./MyExcercises";
import "@testing-library/jest-dom";
import { describe, test, expect } from "@jest/globals";

describe("MyExcercises", () => {
  test("renders MyExcercises page", () => {
    render(
      <MemoryRouter>
        <MyExcercises />
      </MemoryRouter>
    );

    const titleElement = screen.getByText(/Мои упражнения/i);
    expect(titleElement).toBeInTheDocument();

    const addButton = screen.getByText(/Добавить упражнение/i);
    expect(addButton).toBeInTheDocument();
  });
});
