import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./SingleList.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { ListofListColumns } from "../../datatablesource";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAsyncSingleList } from "../../redux/asyncThunks/listThunks";
import { useLocation } from "react-router-dom";
import {
  deleteAsyncSigleMovie,
  getAsyncSigleMovie,
} from "../../redux/asyncThunks/movieThunks";

const SingleList = () => {
  const [add, setAdd] = useState(false);
  const [list, setList] = useState({});
  const [moviesListId, setMoviesListId] = useState([]);
  const [rows, setRows] = useState([]);

  // const rows = [
  //   { _id: "1", title: "Movie 1", genre: "Action", year: 2021 },
  //   { _id: "2", title: "Movie 2", genre: "Comedy", year: 2022 },
  //   { _id: "3", title: "Movie 3", genre: "Drama", year: 2023 },
  //   { _id: "4", title: "Movie 4", genre: "Horror", year: 2024 },
  //   { _id: "5", title: "Movie 5", genre: "Sci-Fi", year: 2025 },
  //   { _id: "6", title: "Movie 6", genre: "Romance", year: 2026 },
  //   { _id: "7", title: "Movie 6", genre: "Romance", year: 2026 },
  //   { _id: "8", title: "Movie 6", genre: "Romance", year: 2026 },
  //   { _id: "9", title: "Movie 6", genre: "Romance", year: 2026 },
  //   // Add more rows as needed
  // ];

  // Action column with buttons
 

  const dispatch = useDispatch();

  const handleOpen = () => {
    setAdd(!add);
  };

  const handleChange = (e) => {
    e.preventDefault();
  };

  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const lists = useSelector((state) => state.lists.lists);

  useEffect(() => {
    dispatch(getAsyncSingleList(path));
  }, [dispatch, path]);

  // console.log(moviesListId);

  useEffect(() => {
    lists.list  && setList(lists.list);

    lists.list && setMoviesListId(lists.list.content);
  
  }, [lists]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Fetch all movies using Promise.all
        const moviePromises = moviesListId.map((id) =>
          dispatch(getAsyncSigleMovie(id))
        );
        // Wait for all promises to resolve
        const movieResponses = await Promise.all(moviePromises);
        // Extract payloads from responses
        const movies = movieResponses.map(
          (response) => response.payload.getMovie
        ); // Adjust based on actual response structure
        // console.log(movies);
        setRows(movies); // Set the state with the fetched movies
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchMovies();
  }, [dispatch, moviesListId]);

  console.log(rows);


  // const deleteMovie = async (id) => {
  //   try {
  //     await dispatch(deleteAsyncSigleMovie(id));
  //     fetchMovies();
  //   } catch (error) {
  //     console.error("Error deleting movie:", error);
  //   }
  // };


    
  const actionColumn = [
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div className="actions">
          <DeleteIcon className="deleteIcon" 
          //  onClick={() => deleteMovie(id)}
          />
        </div>
      ),
    },
  ];

  const AddColumn = [
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div className="actions">
          <AddIcon className="deleteIcon"/>
        </div>
      ),
    },
  ];

  return (
    <div className={`mainContainer ${add ? "blur" : ""}`}>
      <div className="singleList">
        <Sidebar />
        <div className="singleListContainer">
          <Navbar />
          <div className="bottom">
            <div className="singleListButton">
              <button>Edit</button>
              <button>Delete</button>
            </div>
            <form className="addlistForm" onChange={handleChange}>
              <h1 className="addlistTitle">New List</h1>
              <div className="formLeft">
                <div className="addlistItem">
                  <label>Title</label>
                  <input
                    type="text"
                    placeholder="popular movies"
                    name="title"
                    value={list.title}
                    // onChange={handleChange}
                  />
                </div>
                <div className="addlistItem">
                  <label>Genre</label>
                  <input
                    type="text"
                    placeholder="action"
                    name="genre"
                    // onChange={handleChange}
                    value={list.genre}
                  />
                </div>
                <div className="addlistItem">
                  <label>Type</label>
                  <select name="type" value={list.type}>
                    <option>Type</option>
                    <option value="movie">Movie</option>
                    <option value="series">Series</option>
                  </select>
                </div>
                <div className="addlistItem">
                  <label>Content</label>
                  <div className="datagridContainer">
                    <DataGrid
                      className="datagrid"
                      rows={rows}
                      columns={ListofListColumns.concat(actionColumn)}
                      initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: 5,
                          },
                        },
                      }}
                      getRowId={(row) => row._id}
                      rowsPerPageOptions={[5]}
                      checkboxSelection
                    />
                  </div>
                </div>
              </div>

              <button
                className="addlistButton"
                type="button"
                onClick={handleOpen}
              >
                Add
              </button>
              <button className="addlistButton">Create</button>
            </form>
          </div>
        </div>
      </div>
      {add && (
        <div className="AddMovies">
          <DataGrid
            className="datagrid"
            rows={rows}
            columns={ListofListColumns.concat(AddColumn)}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            getRowId={(row) => row._id}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
          <div className="AddMoviesBtn">
            <button>Add</button>
            <button onClick={handleOpen}>Cencel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleList;
