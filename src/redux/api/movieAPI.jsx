import axios from "axios";

const baseUrl = "http://localhost:5000/api";

//GET ALL MOVIES
export const getMovies = () => {
  return axios.get(`${baseUrl}/movies`);
};

//GET QUERY MOVIES
export const getQueryMovies = (query) => {
  return axios.get(`${baseUrl}/movies/query?type=${query}`);
};

//GET SINLGE MOVIE
export const getSingleMovie = (id) => {
  return axios.get(`${baseUrl}/movies/${id}`);
};

//DELETE MOVIE
export const deleteSingleMovie = (id) => {
  return axios.delete(`${baseUrl}/movies/${id}`);
};

//CREATE MOVIE
export const createSingleMovie = (newMovie) => {
  return axios.post(`${baseUrl}/movies/newmovie`, newMovie);
};

//UPDATE MOVIE
// export const updateSingleMovie = (id,updateMovie) => {
//   return axios.delete(`${baseUrl}/movies/${id}, upda`);
// };
