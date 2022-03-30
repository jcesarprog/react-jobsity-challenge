import {
  render,
  screen,
  waitFor
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppContextProvider } from "../contexts/AppContext";
import Calendar from "./Calendar";

describe("Calendar App", () => {
  test("Check Calendar page rendering", () => {
    render(<Calendar />, { wrapper: AppContextProvider });

    // Check if the 2 sections are rendered
    const sections = screen.getAllByRole("section");
    expect(sections.length).toBe(2);

    // Check if the footer is rendered
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();

    // Check the content of the footer
    expect(footer.textContent).toBe(
      "@2022 JULIO TEIXEIRA, ALL RIGHTS RESERVED!"
    );
  });

  test("Check click on day and opening the modal then closing the modal", () => {
    render(<Calendar />, { wrapper: AppContextProvider });

    // filter the days to select
    const daysBtns = screen
      .getAllByRole("button")
      .filter((btns) => btns.className.includes("btn__day"));

    // get the first day to test if a click will open modal
    userEvent.click(daysBtns[0]);

    // Check if overlay is rendered
    const overlay = screen.getByRole("overlay");
    expect(overlay).toBeInTheDocument();

    // Check if the modal is rendered
    const modal = screen.getByRole("dialog");
    expect(modal).toBeInTheDocument();

    // check if modal will close when clicking cancel
    const cancelBtn = screen.getByRole("button", { name: "Cancel delete" });
    expect(cancelBtn).toBeInTheDocument();
    userEvent.click(cancelBtn);

    expect(modal).not.toBeInTheDocument();
  });

  test("Check click on day and opening the modal then try to save with no input", () => {
    render(<Calendar />, { wrapper: AppContextProvider });

    // filter the days to select
    const daysBtns = screen
      .getAllByRole("button")
      .filter((btns) => btns.className.includes("btn__day"));

    // get the first day to test if a click will open modal
    userEvent.click(daysBtns[0]);

    // Check if overlay is rendered
    const overlay = screen.getByRole("overlay");
    expect(overlay).toBeInTheDocument();

    // Check if the modal is rendered
    const modal = screen.getByRole("dialog");
    expect(modal).toBeInTheDocument();

    // check if modal will save when clicking save
    const saveBtn = screen.getByRole("button", { name: "Save save" });
    expect(saveBtn).toBeInTheDocument();
    userEvent.click(saveBtn);

    // If the model dont have any input it wont close, meaning its not saving, so the model will persist on the document
    expect(modal).toBeInTheDocument();
  });

  test("Check click on day and opening the modal then try to save with data but no city input ", async () => {
    render(<Calendar />, { wrapper: AppContextProvider });
    // filter the days to select
    const daysBtns = screen
      .getAllByRole("button")
      .filter((btns) => btns.className.includes("btn__day"));
    // get the first day to test if a click will open modal
    userEvent.click(daysBtns[0]);
    // Check if overlay is rendered
    const overlay = screen.getByRole("overlay");
    expect(overlay).toBeInTheDocument();

    // Check if the modal is rendered
    const modal = screen.getByRole("dialog");
    expect(modal).toBeInTheDocument();

    // Get the title input
    const titleInput = screen.getByPlaceholderText("Add a title");

    // Type something in the title input
    userEvent.type(titleInput, "Test title");

    // Get the 2 time inputs
    const inputNumbers = screen.getAllByRole("spinbutton");
    expect(inputNumbers.length).toBe(2);

    // Insert the time in the first input
    userEvent.type(inputNumbers[0], "12");

    // Insert the time in the second input
    userEvent.type(inputNumbers[1], "30");

    // check if modal will save when clicking save
    const saveBtn = screen.getByRole("button", { name: "Save save" });
    expect(saveBtn).toBeInTheDocument();
    userEvent.click(saveBtn);

    // Check if the error response was rendered with the class
    const errorResponse = screen
      .getAllByRole("paragraph")
      .filter((p) => p.className === "error");

    // If it has one, it means the class was added and the error showed
    expect(errorResponse.length).toBe(1);

    // Check if the modal is still rendered
    // If the model dont have any input it wont close, meaning its not saving, so the model will persist on the document
    expect(modal).toBeInTheDocument();
  });

  test("Check click on day and opening the modal then try to save with data but no city input ", async () => {
    render(<Calendar />, { wrapper: AppContextProvider });
    // filter the days to select
    const daysBtns = screen
      .getAllByRole("button")
      .filter((btns) => btns.className.includes("btn__day"));
    // get the first day to test if a click will open modal
    userEvent.click(daysBtns[0]);
    // Check if overlay is rendered
    const overlay = screen.getByRole("overlay");
    expect(overlay).toBeInTheDocument();

    // Check if the modal is rendered
    const modal = screen.getByRole("dialog");
    expect(modal).toBeInTheDocument();

    // Get the title input
    const titleInput = screen.getByPlaceholderText("Add a title");

    // Type something in the title input
    userEvent.type(titleInput, "Test title");

    // Get the city input Add a city
    const cityInput = screen.getByPlaceholderText("Add a city");

    // Type something in the city input
    userEvent.type(cityInput, "Rio de janeiro");

    // Get the 2 time inputs
    const inputNumbers = screen.getAllByRole("spinbutton");
    expect(inputNumbers.length).toBe(2);

    // Insert the time in the first input
    userEvent.type(inputNumbers[0], "12");

    // Insert the time in the second input
    userEvent.type(inputNumbers[1], "30");

    // check if modal will save when clicking save
    const saveBtn = screen.getByRole("button", { name: "Save save" });
    expect(saveBtn).toBeInTheDocument();
    userEvent.click(saveBtn);

    // Check if the modal is still rendered
    // If the model dont have any input it wont close, meaning its not saving, so the model will persist on the document
    waitFor(() => {
      expect(modal).not.toBeInTheDocument();
    });
  });
});
