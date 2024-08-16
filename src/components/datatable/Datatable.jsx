import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAsyncSigleMovie,
  getQueryAsyncMovies,
} from "../../redux/asyncThunks/movieThunks.jsx";
import { deleteAsyncSingleUser, getAsyncUsers } from "../../redux/asyncThunks/userThunks.jsx";
import { deleteAsyncSingleList, getAsyncLists } from "../../redux/asyncThunks/listThunks.jsx";

const Datatable = ({ title, type, listColumns, movieType }) => {
  const location = useLocation();
  const path = location.pathname;
  const dispatch = useDispatch();

  const movies = useSelector((state) => state.movies.movies);
  const users = useSelector((state) => state.users.users);

  const lists = useSelector((state) =>state.lists.lists);

  

  useEffect(() => {
    if (movieType === "movies") {
      dispatch(getQueryAsyncMovies(movieType));
    } else if (movieType === "users") {
      dispatch(getAsyncUsers());
    } else if (movieType === "webseries") {
      dispatch(getQueryAsyncMovies(movieType))
    }else if (movieType === "lists") {
      console.log(lists.lists);
      dispatch(getAsyncLists(movieType))
     
    }
  }, [dispatch, movieType]);

  const handleDelete = (id) => {
    try {
      if (movieType === "movies") {
        dispatch(deleteAsyncSigleMovie(id));
      } else if (movieType === "users") {
        dispatch(deleteAsyncSingleUser(id));
      }else if (movieType === "lists") {
        dispatch(deleteAsyncSingleList(id));
      }
    } catch (error) {
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
            <Link to={`/${movieType}/${_id}`} style={{ textDecoration: "none" }}>
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
  let rows ;
  if (movieType === "movies") {
    rows = movies.movies;
  } else if (movieType === "webseries") {
    rows = movies.movies; // Adjust if needed
  } else if (movieType === "users") {
    rows = users.users;
  }else if (movieType === "lists") {
    rows = lists.lists;
  } else {
    rows = [];
  }

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {title}
        {path !== "/users" && (
          <Link to={`/${type}/new`} className="link">
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
