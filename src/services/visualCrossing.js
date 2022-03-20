import axios from "axios";

function getOptionsWeather(city, date) {
  return {
    method: 'GET',
    url: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${date}`,
    params: {
      unitGroup:'us',
      key:process.env.REACT_APP_VISUAL_CROSSING_KEY
    }
  }
}
//? Current Weather Data
async function getWeather(city, date) {
  try {
    const res = await axios.request(getOptionsWeather(city, date))
    const data = res.data.days[0];

    // console.log([data.conditions, data.icon]);
    return data;
  } catch (error) {
    throw new Error(error.message)
    
  }
}



export const visualCrossingService = {
  getWeather
};
