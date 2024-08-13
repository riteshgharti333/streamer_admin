import axios from "axios";

const baseUrl = import.meta.env.VITE_SOME_KEY;


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
export const updateSingleMovie = (id,updateMovie) => {
  return axios.put(`${baseUrl}/movies/${id}`,updateMovie);
};
