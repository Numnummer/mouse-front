import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Profile from "./Profile";
import "@testing-library/jest-dom";
import { describe, test, expect } from "@jest/globals";

describe("Profile", () => {
  const setup = (isProfileExists) => {
    const userData = {};
    const setUserData = () => {};
    const setisProfileExists = () => {};
    render(
      <MemoryRouter>
        <Profile
          userData={userData}
          setIsProfileExists={setisProfileExists}
          setUserData={setUserData}
          isProfileExists={isProfileExists}
        />
      </MemoryRouter>
    );
  };
  test("renders filled profile page", () => {
    setup(true);

    const titleElement = screen.getByText(/Персональные данные/i);
    expect(titleElement).toBeInTheDocument();

    const name = screen.getByText(/Имя:/i);
    expect(name).toBeInTheDocument();

    const surname = screen.getByText(/Фамилия:/i);
    expect(surname).toBeInTheDocument();

    const birthDate = screen.getByText(/Дата рождения:/i);
    expect(birthDate).toBeInTheDocument();

    const gend = screen.getByText(/Пол:/i);
    expect(gend).toBeInTheDocument();

    const height = screen.getByText(/Рост:/i);
    expect(height).toBeInTheDocument();

    const weight = screen.getByText(/Вес:/i);
    expect(weight).toBeInTheDocument();

    const phone = screen.getByText(/Телефон:/i);
    expect(phone).toBeInTheDocument();

    const mail = screen.getByText(/Email:/i);
    expect(mail).toBeInTheDocument();

    const fillButton = screen.getByText("Обновить профиль");
    expect(fillButton).toBeInTheDocument();
  });

  test("renders not filled profile page", () => {
    setup(false);

    const fillButton = screen.getByText(/Заполнить профиль/i);
    expect(fillButton).toBeInTheDocument();
  });
});
