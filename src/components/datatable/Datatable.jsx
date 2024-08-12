import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAsyncMovies,
  getQueryAsyncMovies,
} from "../../redux/asyncThunks/movieThunks.jsx";

const Datatable = ({ title, type, listColumns, movieType }) => {
  const [data, setData] = useState([]);

  const location = useLocation();

  const path = location.pathname;

  const dispatch = useDispatch();

  const movies = useSelector((state) => state.movies.movies);


  useEffect(() => {
    dispatch(getQueryAsyncMovies(movieType));
  }, [dispatch,movieType]);

  useEffect(() => {
    if (movies) {
      setData(movies.movies);
      // console.log(movies.movies)
      console.log(data);
    }
  }, [movies]);



  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const { _id } = params.row;
        return (
          <div className="cellAction">
            <Link to={`/movies/${_id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

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
        rows={data}
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
