const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "3bb54b3294mshf5c7331d95313f0p183ec3jsnabe01beb2a16",
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
  },
};

export const getWeatherData = async (url: string) => {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
};
