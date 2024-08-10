import axios from "axios";

const baseUrl = "http://localhost:5000/api";

//GET ALL MOVIES
export const getMovies = () => {
  return axios.get(`${baseUrl}/movies`);
};

//GET SINLGE MOVIE
export const getSingleMovie = (id) => {
    return axios.get(`${baseUrl}/movies/${id}`);
  };

//DELETE MOVIE
//UPDATE MOVIE
//CREATE MOVIE







