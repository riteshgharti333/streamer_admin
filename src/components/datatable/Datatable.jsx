import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteAsyncSigleMovie,
  getQueryAsyncMovies,
} from "../../redux/asyncThunks/movieThunks.jsx";
import {
  deleteAsyncSingleUser,
  getAsyncUsers,
} from "../../redux/asyncThunks/userThunks.jsx";
import {
  deleteAsyncSingleList,
  getAsyncLists,
} from "../../redux/asyncThunks/listThunks.jsx";
import { toast } from "react-toastify";



const Datatable = ({ title, type, listColumns, movieType }) => {
  const location = useLocation();
  const path = location.pathname;
  const dispatch = useDispatch();

  const movies = useSelector((state) => state.movies.movies);

  const webseries = useSelector((state) => state.movies.series);

  const users = useSelector((state) => state.users.users);

  const lists = useSelector((state) => state.lists.lists);

  // Fetching the data
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (movieType === "movies") {
          await dispatch(getQueryAsyncMovies(movieType)).unwrap();
        } else if (movieType === "users") {
          await dispatch(getAsyncUsers()).unwrap();
        } else if (movieType === "webseries") {
          await dispatch(getQueryAsyncMovies(movieType)).unwrap()
        } else if (movieType === "lists") {
          await dispatch(getAsyncLists(movieType)).unwrap();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch, movieType]);

  // deleting from datatable
  const handleDelete = async (id) => {
    try {
      let response;
  
      if (movieType === "movies") {
        response = await dispatch(deleteAsyncSigleMovie(id)).unwrap();
      } else if (movieType === "users") {
        response = await dispatch(deleteAsyncSingleUser(id)).unwrap();
      } else if (movieType === "webseries") {
        response = await dispatch(deleteAsyncSigleMovie(id)).unwrap();
      } else if (movieType === "lists") {
        response = await dispatch(deleteAsyncSingleList(id)).unwrap();
      }
      toast.success("Item Deleted");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const { _id } = params.row;
        return (
          <div className="cellAction">
            <Link
              to={`/${movieType}/${_id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            <div className="deleteButton" onClick={() => handleDelete(_id)}>
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  // Determine which rows to use based on `movieType`
  let rows;
  if (movieType === "movies") {
    rows = movies.movies;
  } else if (movieType === "webseries") {
    rows = webseries.movies;
  } else if (movieType === "users") {
    rows = users.users;
  } else if (movieType === "lists") {
    rows = lists.lists;
  } else {
    rows = [];
  }

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {title}
        {path !== "/users" && (
          <Link to={`/${movieType}/new`} className="link">
            Add New
          </Link>
        )}
      </div>

      <DataGrid
        className="datagrid"
        rows={rows}
        columns={listColumns.concat(actionColumn)}
        pageSize={9}
        getRowId={(row) => row._id}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
