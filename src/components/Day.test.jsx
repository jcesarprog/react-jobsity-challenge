import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppContextProvider } from "../contexts/AppContext";
import { getMonth } from "../util/utils";
import { Day } from "./Day";

describe("Day Component", () => {
  test("Check if the component is rendered properly on weekends", () => {
    // Render the component with the first day from the table
    // The first day in the table should always be Sunday
    render(<Day day={getMonth()[0][0]} />, { wrapper: AppContextProvider });

    // Get the day Cell
    const dayCell = screen.getByRole("button");

    // Check if the day cell item has the class "btn__day"
    expect(dayCell.classList.contains("btn__day")).toBe(true);

    // Get the div responsible for deciding if its a weekend day
    const weekendDay = screen.getByTestId("day");

    // Check if the the day cell is a weekend day
    expect(weekendDay.classList.contains("weekend")).toBe(true);

    // Get the paragraph
    const dayNumber = screen.getByRole("paragraph");

    // Check if it has blueish as a class since its a sunday
    expect(dayNumber.classList.contains("blueish")).toBe(true);

    // Check if the day number is rendered
    expect(dayNumber.textContent.length).toBeGreaterThan(0);
  });

  test("Check if the component is rendered properly on week days (business day)", () => {
    // Render the component with the second day from the table
    // The second day in the table should always be Monday
    render(<Day day={getMonth()[0][1]} />, { wrapper: AppContextProvider });

    // Get the day Cell
    const dayCell = screen.getByRole("button");

    // Check if the day cell item has the class "btn__day"
    expect(dayCell.classList.contains("btn__day")).toBe(true);

    // Get the div responsible for deciding if its a weekend day
    const weekendDay = screen.getByTestId("day");

    // Check if the the day cell is a weekend day
    expect(weekendDay.classList.contains("weekend")).toBe(false);

    // Get the paragraph
    const dayNumber = screen.getByRole("paragraph");

    // Check if the day number is rendered
    expect(dayNumber.textContent.length).toBeGreaterThan(0);
  });
});
