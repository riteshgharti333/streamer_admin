import axios from "axios";

const baseUrl = import.meta.env.VITE_API_KEY;

//GET ALL LISTS
export const getLists = () => {
    return axios.get(`${baseUrl}/list`);
  };

//GET QUERY LITS
export const getQueryLists = () => {
    return axios.get(`${baseUrl}/list?type=${query}`);
  };

//GET SINGLE LIST
export const getSingleList = (id) => {
    return axios.get(`${baseUrl}/list/${id}`);
  };

//DELETE LISTS
export const deleteSingleList = (id) => {
    return axios.delete(`${baseUrl}/list/${id}`);
  };


//UPDATE LIST
export const updateSingleList = (id,updateList) => {
  return axios.put(`${baseUrl}/list/${id}`,updateList);
};

//CREATE MOVIE
export const createSingleList = (newList) => {
  return axios.post(`${baseUrl}/list/newlist`, newList);
};
