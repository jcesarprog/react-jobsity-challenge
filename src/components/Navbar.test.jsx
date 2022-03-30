import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import dayjs from "dayjs";
import { AppContextProvider } from "../contexts/AppContext";
import { Navbar } from "./Navbar";

// Just a helper array to check month updates without using the Api calls due to limit of daily API usage
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

describe("Navbar Component", () => {
  test("Should render 5 items properly", () => {
    // Render the component
    render(<Navbar />, { wrapper: AppContextProvider });

    // should have 2 chevrons
    const buttons = screen.getAllByRole("button");
    expect(buttons[0].textContent).toBe("chevron_left");
    expect(buttons[1].textContent).toBe("chevron_right");

    // Should have the today button
    expect(buttons[2].textContent).toBe("Today");

    // Should have the Current Month
    expect(screen.getByText(dayjs().format("MMMM YYYY"))).toBeInTheDocument();

    // should have the Jobsity logo
    expect(screen.getByAltText("jobsity")).toBeInTheDocument();
  });

  test("Clicking on chevrons should change the month correctly", () => {
    // Render the component
    render(<Navbar />, { wrapper: AppContextProvider });

    // Get the chevrons
    const [chevLeft, chevRight] = screen.getAllByRole("button");

    // Get the current month
    const currMonth = screen.getByRole("heading").textContent.split(" ")[0];

    // Find the index of the current month on the array
    let currMonthIndex = months.indexOf(currMonth);

    // Click on the left chevron
    userEvent.click(chevLeft);

    // Create a previous month index for reference into currMonthIndex
    currMonthIndex = currMonthIndex === 0 ? 11 : currMonthIndex - 1;

    // Check if the month changed to the previous one
    const previousMonth = screen.getByRole("heading").textContent.split(" ")[0];
    expect(previousMonth).toBe(months[currMonthIndex]);

    // Click on the right chevron
    userEvent.click(chevRight);
    const nextMonth = screen.getByRole("heading").textContent.split(" ")[0];

    // Create a next month index for reference into currMonthIndex
    currMonthIndex = currMonthIndex === 11 ? 0 : currMonthIndex + 1;

    // Check if the month changed to the next one
    expect(nextMonth).toBe(months[currMonthIndex]);
  });

  test("Check if clicking on Today button goes back to the current month", () => {
    // Render the component
    render(<Navbar />, { wrapper: AppContextProvider });

    // Get the chevrons
    const [chevLeft, chevRight] = screen.getAllByRole("button");

    // Get the Today button
    const todayBtn = screen.getByText("Today");

    // Get the current month
    const currMonth = screen.getByRole("heading").textContent.split(" ")[0];

    // Click on left chevron
    userEvent.click(chevLeft);

    // Click on Today button
    userEvent.click(todayBtn);

    // Check if the month changed to the current one
    expect(screen.getByRole("heading").textContent.split(" ")[0]).toBe(
      currMonth
    );

    // Click on right chevron
    userEvent.click(chevRight);

    // Click on Today button
    userEvent.click(todayBtn);

    // Check if the month changed to the current one
    expect(screen.getByRole("heading").textContent.split(" ")[0]).toBe(
      currMonth
    );
  });
});
