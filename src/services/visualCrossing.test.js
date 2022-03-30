import { visualCrossingService } from "./visualCrossing";
describe("VisualCrossing service", () => {
    // Skipped those test by default because VisualCrossing has a limit of requests per day but they are working
  test.skip("Check if the request is working for arbitrary city and date", async () => {
    const request = await visualCrossingService.getWeather(
      "New York",
      "2022-01-01"
    );
    const resolvedAddress = request.address;
    const resolvedDate = request.days[0].datetime;
    expect(resolvedAddress).toBe("New York");
    expect(resolvedDate).toBe("2022-01-01");
  });
  test("Check if the request is not working for a city that don't exist", async () => {
    try {
      await visualCrossingService.getWeather(
        "Land Land123453452345234523",
        "2022-01-01"
      );
    } catch (e) {
      expect(e.message).toBe("Request failed with status code 400");
    }
  });

  test.skip("Check if the request is working for a misspelled city name", async () => {
    const request = await visualCrossingService.getWeather(
      "RI O DE JANEIRO",
      "2022-01-01"
    );
    const resolvedAddress = request.resolvedAddress.split(",")[0];
    console.log(resolvedAddress);
    expect(resolvedAddress).toBe("Rio de Janeiro");
  });
});
