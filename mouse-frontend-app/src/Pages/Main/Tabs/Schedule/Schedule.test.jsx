import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Schedule from "./Schedule";
import "@testing-library/jest-dom";
import { describe, test, expect } from "@jest/globals";

describe("Schedule", () => {
  const setup = () => {
    render(
      <MemoryRouter>
        <Schedule currentTab="Schedule" />
      </MemoryRouter>
    );
  };
  test("renders schedule page", () => {
    setup();

    const titleElement = screen.getByText(/Расписание/i);
    expect(titleElement).toBeInTheDocument();

    const msgs = screen.getByText(/Добавить тренировку/i);
    expect(msgs).toBeInTheDocument();
  });
});
