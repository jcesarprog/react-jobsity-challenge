import dayjs from "dayjs";
import { getMonth } from "./utils";

describe("Checking the algorithm which gets the days table to be displayed", () => {
  test("Checking if algorithm returns a 5x7 tabular content", () => {
    const table = getMonth();
    const dimensions = [table.length, table[0].length];
    expect(dimensions).toEqual([5, 7]);
  });
  test("Checking if the algorithm returns the first day of the current month correctly", () => {
    const table = getMonth();
    const year = dayjs().year();
    const firstDayOfTheMonthIdx = dayjs(
      new Date(year, dayjs().month(), 1)
    ).day();
    const actualFirstDayOfTheMonth = dayjs(
      new Date(year, dayjs().month(), 1)
    ).format("DD MMMM YYYY");
    // Assuming it will be on the first row of the table
    expect(table[0][firstDayOfTheMonthIdx].format("DD MMMM YYYY")).toBe(
      actualFirstDayOfTheMonth
    );
  });
  test("Checking if the algorithm returns the correct month using positive and negative parameters", () => {
    //   month -> -1: "December" 0: "January", 1: "February", 11: "December" , 12: "January"w
    function getMonthName(month){
        const table = getMonth(month);
        const year = dayjs().year();
        const firstDayOfTheMonthIdx = dayjs(new Date(year, month, 1)).day();
        return(table[0][firstDayOfTheMonthIdx].format("MMMM"));
    }
    expect(getMonthName(-1)).toBe("December");
    expect(getMonthName(0)).toBe("January");
    expect(getMonthName(1)).toBe("February");
    expect(getMonthName(11)).toBe("December");
    expect(getMonthName(12)).toBe("January");
  });
});
