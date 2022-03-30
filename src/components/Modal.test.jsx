import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
  waitFor
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import dayjs from "dayjs";
import { AppContextProvider } from "../contexts/AppContext";
import { getMonth } from "../util/utils";
import { Modal } from "./Modal";

describe("Modal Component", () => {
  test("should render properly", () => {
    // Render the component with the first day from the table
    render(<Modal setOpenModal={jest.fn()} day={getMonth()[0][0]} />, {
      wrapper: AppContextProvider
    });

    // Check if the overlay is rendered
    const overlay = screen.getByRole("overlay");
    expect(overlay).toBeInTheDocument();

    // Check if the modal is rendered
    const modal = screen.getByRole("dialog");
    expect(modal).toBeInTheDocument();

    // Check if the schedule icon is rendered
    const scheduleIcon = screen.getByTestId("modal-icon");
    expect(scheduleIcon).toBeInTheDocument();

    // Check if the modal title (the day) is rendered
    const modalTitle = screen.getByRole("heading");
    expect(modalTitle).toBeInTheDocument();

    // Check if the title is the expected day
    const expectedDay = getMonth()[0][0];
    expect(modalTitle.textContent).toBe(expectedDay.format("dddd, MMMM DD"));

    // Check if the 2 inputs are rendered
    const inputs = screen.getAllByRole("textbox");
    expect(inputs.length).toBe(2);

    // Check if the 2 time inputs are rendered
    const inputNumbers = screen.getAllByRole("spinbutton");
    expect(inputNumbers.length).toBe(2);

    // Check if the 2 paragraphs are rendered
    const paragraphs = screen.getAllByRole("paragraph");
    expect(paragraphs.length).toBe(2);

    // Check if buttons are rendered
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(2);
  });

  test("Check if it calls the closing when clicking on overlay", () => {
    const handleClose = jest.fn();
    // Render the component with the first day from the table
    render(<Modal setOpenModal={handleClose} day={getMonth()[0][0]} />, {
      wrapper: AppContextProvider
    });

    const overlay = screen.getByRole("overlay");
    userEvent.click(overlay);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
  test("Check if it calls the closing when clicking on pressing Esc", () => {
    const handleClose = jest.fn();
    // Render the component with the first day from the table
    render(<Modal setOpenModal={handleClose} day={getMonth()[0][0]} />, {
      wrapper: AppContextProvider
    });

    const overlay = screen.getByRole("overlay");
    fireEvent.keyDown(overlay, { key: "Escape" });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
