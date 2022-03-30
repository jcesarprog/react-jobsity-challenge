import { render, screen } from "@testing-library/react";
import { getMonth } from "../util/utils";
import {Month, weekDays} from "./Month";

describe("Month Component", ()=>{
    test("Check if the component is rendered properly", ()=>{
        // Render the component with the current month
        render(<Month month={getMonth()}/>);
        
        // Check if the week days are rendered
        const weekDaysCells = screen.getAllByRole("cell");
        
        // Check if there are seven days rendered
        expect(weekDaysCells.length).toBe(7);

        // Check if the first day of the week is Sunday
        expect(weekDaysCells[0].textContent).toBe(weekDays[0]);

        // Check if the last day of the week is Saturday
        expect(weekDaysCells[6].textContent).toBe(weekDays[6]);

        // Check if there are 35 days rendered, since its presented in 5x7 grid
        const dayBtns = screen.getAllByRole("button");
        expect(dayBtns.length).toBe(35);

        // Check if a day was marked as today
        const hasTodayMark = screen.getByRole("mark");
        expect(hasTodayMark).toBeInTheDocument();
    })
})