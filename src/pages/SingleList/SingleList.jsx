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
import {
  deleteAsyncSingleList,
  getAsyncSingleList,
} from "../../redux/asyncThunks/listThunks";
import { useLocation, useNavigate } from "react-router-dom";
import {
  deleteAsyncSigleMovie,
  getAsyncSigleMovie,
} from "../../redux/asyncThunks/movieThunks";

const SingleList = () => {

  const [add, setAdd] = useState(false);
  const [list, setList] = useState({});
  const [moviesListId, setMoviesListId] = useState([]);
  const [rows, setRows] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (lists.list) {
      setList(lists.list);
      setMoviesListId(lists.list.content);
    }
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
        setRows(movies);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchMovies();
  }, [dispatch, moviesListId]);

  const deleteList = async (id) => {
    dispatch(deleteAsyncSingleList(id));
    console.log("list deleted");
    navigate(-1);
  };

  const actionColumn = [
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div className="actions">
          <DeleteIcon className="deleteIcon" />
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
          <AddIcon className="deleteIcon" />
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
