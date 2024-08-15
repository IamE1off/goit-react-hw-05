import axios from "axios";

const API_KEY = "67f9d13cb5f574eb9ad6255693ed8f0c";
const BASE_URL = "https://api.themoviedb.org/3";
axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common['Authorization'] = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2N2Y5ZDEzY2I1ZjU3NGViOWFkNjI1NTY5M2VkOGYwYyIsIm5iZiI6MTcyMzcyNzgwNC45NTg2ODEsInN1YiI6IjY2YmRmYWY0YTAzZDUxMGU1NzliODA5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7G6KBEoJg6UOMzVFv4qH5Oq9eDyjKaUk59yEi7-wp-w";

export const getMovies = async () => {
  const response = await axios.get("/trending/movie/day?language=en-US", {
    params: {
      api_key: API_KEY
    }  
  });
  console.log(response);
  return response.data.results;
}

export const getMovieById = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}?language=en-US`);
  console.log(response);
  return response.data;
}

export const getMovieCast = async (castId) => {
  const response = await axios.get(`/movie/${castId}/credits?language=en-US`);
  console.log(response);
  return response.data;
}
export const getMovieReviews = async (reviewId) => {
  const response = await axios.get(`/movie/${reviewId}/reviews?language=en-US`);
  console.log(response);
  return response.data.results;
}

export const getMovieByQuery = async (query) => {
  const response = await axios.get("/search/movie", {
    params: {
      query: query,  
    }
  });
  console.log(response);
  return response.data.results;
}