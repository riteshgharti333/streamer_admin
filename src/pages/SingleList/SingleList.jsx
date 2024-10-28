import { useState } from "react";
import "./SingleList.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import { ListofListColumns } from "../../datatablesource";
import { ListofListSColumns } from "../../datatablesource";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteAsyncSingleList,
  getAsyncSingleList,
  updateAsyncSingleList,
} from "../../redux/asyncThunks/listThunks"; // Import the update thunk
import { useLocation, useNavigate } from "react-router-dom";
import {
  getAsyncMovies,
  getAsyncSigleMovie,
} from "../../redux/asyncThunks/movieThunks";
import { genre } from "../../datatablesource";
<<<<<<< HEAD
import { toast } from "react-toastify";
=======
>>>>>>> f9c7e66 (add create list slice)

const SingleList = () => {
  const [add, setAdd] = useState(false);
  const [list, setList] = useState({});
  const [moviesListId, setMoviesListId] = useState([]);
  const [rows, setRows] = useState([]);
  const [allMovies, setAllMovies] = useState([]);

  const [data, setData] = useState({});
  const [selectedMovies, setSelectedMovies] = useState([]);

<<<<<<< HEAD
=======

>>>>>>> f9c7e66 (add create list slice)
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const path = location.pathname.split("/")[2];

  const lists = useSelector((state) => state.lists.lists);
  const movies = useSelector((state) => state.movies.movies);

  useEffect(() => {
    dispatch(getAsyncMovies());
  }, [dispatch]);

  useEffect(() => {
    if (movies && movies.movies) {
      const filtered = movies.movies.filter(
<<<<<<< HEAD
        (movie) => !moviesListId.includes(movie._id),
=======
        (movie) => !moviesListId.includes(movie._id)
>>>>>>> f9c7e66 (add create list slice)
      );
      setAllMovies(filtered);
    }
  }, [movies, moviesListId]);
<<<<<<< HEAD
=======
  
>>>>>>> f9c7e66 (add create list slice)

  const handleChange = (e) => {
    const value = e.target.value;
    setData({ ...data, [e.target.name]: value });
    setList((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  const handleOpen = () => {
    setAdd(!add);
  };

  useEffect(() => {
    dispatch(getAsyncSingleList(path));
  }, [dispatch, path]);

  useEffect(() => {
    if (lists.list) {
      setList(lists.list);
      setMoviesListId(lists.list.content);
    }
  }, [lists]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviePromises = moviesListId.map((id) =>
          dispatch(getAsyncSigleMovie(id)),
        );
        const movieResponses = await Promise.all(moviePromises);
        const movies = movieResponses.map(
<<<<<<< HEAD
          (response) => response.payload.getMovie,
=======
          (response) => response.payload.getMovie
>>>>>>> f9c7e66 (add create list slice)
        );
        setRows(movies);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchMovies();
  }, [dispatch, moviesListId]);

  const deleteList = async (id) => {
    try {
      await dispatch(deleteAsyncSingleList(id)).unwrap();
      toast.success("list deleted");
      navigate(-1);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const handleRowSelection = (selectionModel) => {
    setSelectedMovies(selectionModel);
  };

  const handleAddMovies = () => {
    const updatedContent = [...moviesListId, ...selectedMovies];
    setMoviesListId(updatedContent);

    setList({ ...list, content: updatedContent });
    setAdd(false);

    console.log(selectedMovies);
    setAdd(!add);
  };

  const deleteMovieFromList = (id) => {
    const updatedContent = moviesListId.filter((movieId) => movieId !== id);
    setMoviesListId(updatedContent);
    setList({ ...list, content: updatedContent });
  };

  const updateList = async () => {
    const updateList = {
      ...list,
      content: moviesListId,
    };
    try {
      await dispatch(
        updateAsyncSingleList({ id: list._id, updateList }),
      ).unwrap();
      toast.success("Updated Successfully");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  

  const handleRowSelection = (selectionModel) => {
    setSelectedMovies(selectionModel);
  };

  const handleAddMovies = () => {
    const updatedContent = [...moviesListId, ...selectedMovies];
    setMoviesListId(updatedContent);

    setList({ ...list, content: updatedContent });
    setAdd(false);

    console.log(selectedMovies);
    setAdd(!add);
  };

  const deleteMovieFromList = (id) => {
    const updatedContent = moviesListId.filter((movieId) => movieId !== id);
    setMoviesListId(updatedContent);
    setList({ ...list, content: updatedContent });
  };


  const updateList = async () => {
    const updateList = {
      ...list,
      content: moviesListId, 
    };
    try {
      dispatch(updateAsyncSingleList({ id: list._id, updateList }));      
      navigate(0)
    } catch (error) {
      console.log(error);
    }
  
  };

 

  const actionColumn = [
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div className="actions">
          <DeleteIcon
            className="deleteIcon"
            onClick={() => deleteMovieFromList(params.row._id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className={`mainContainer ${add ? "blur" : ""}`}>
      <div className="singleList">
<<<<<<< HEAD
        <div className="top">
          <h1 className="addlistTitle ">Update List</h1>
          <button className="primary-btn" onClick={() => deleteList(list._id)}>
            Delete
          </button>
        </div>
        <div className="bottom">
          <form className="addlistForm" onChange={handleChange}>
            <div className="addlistItem">
              <input
                type="text"
                placeholder="popular movies"
                name="title"
                value={list.title || ""}
                onChange={handleChange}
              />
              <label>Title</label>
            </div>
            <div className="addlistItem">
              <label>Genre</label>
              <select name="genre" value={list.genre} onChange={handleChange}>
                {genre.map((g) => (
                  <option key={g}>{g}</option>
                ))}
              </select>
            </div>
            <div className="addlistItem">
              <label>Type</label>
=======
        <Sidebar />
        <div className="singleListContainer">
          <Navbar />
          <div className="bottom">
            <div className="singleListButton">
              <button onClick={() => deleteList(list._id)}>Delete</button>
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
                    value={list.title || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="addlistItem">
                  <label>Genre</label>
                  <select
                    name="genre"
                    value={list.genre}
                    onChange={handleChange}
                  >
                    {genre.map((g) => (
                      <option key={g}>{g}</option>
                    ))}
                  </select>
                </div>
                <div className="addlistItem">
                  <label>Type</label>

                  <select name="type" value={list.type} onChange={handleChange}>
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
                      pageSizeOptions={[5, 10, 20]}
                      checkboxSelection
                    />
                  </div>
                </div>
              </div>
>>>>>>> f9c7e66 (add create list slice)

              <select name="type" value={list.type} onChange={handleChange}>
                <option value="movies">Movie</option>
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
                  pageSizeOptions={[5, 10, 20]}
                  checkboxSelection
                />
              </div>
            </div>

            <div className="listButton">
              <button
                className="addlistButton primary-btn"
                type="button"
                onClick={handleOpen}
              >
                Add
              </button>
              <button
<<<<<<< HEAD
                className="addlistButton primary-btn"
=======
                className="addlistButton"
>>>>>>> f9c7e66 (add create list slice)
                type="button"
                onClick={updateList}
              >
                Update
              </button>
<<<<<<< HEAD
            </div>
          </form>
=======
            </form>
          </div>
>>>>>>> f9c7e66 (add create list slice)
        </div>
      </div>
      {add && (
        <div className="AddMovies">
          <DataGrid
            className="datagrid"
            rows={allMovies}
            columns={ListofListSColumns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            getRowId={(row) => row._id}
            pageSizeOptions={[5, 10, 20]}
            checkboxSelection
            disableRowSelectionOnClick
            onRowSelectionModelChange={handleRowSelection}
          />
          <div className="AddMoviesBtn">
<<<<<<< HEAD
            <button className="primary-btn" onClick={handleAddMovies}>
              Add
            </button>
            <button className="primary-btn" onClick={handleOpen}>
              Cancel
            </button>
=======
          <button onClick={handleAddMovies}>Add</button>
            <button onClick={handleOpen}>Cancel</button>
>>>>>>> f9c7e66 (add create list slice)
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleList;
