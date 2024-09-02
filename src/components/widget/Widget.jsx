import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { widgetData } from "../../datatablesource";

import { db } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { getAsyncUsers } from "../../redux/asyncThunks/userThunks";
import { getQueryAsyncMovies } from "../../redux/asyncThunks/movieThunks";

const Widget = ({ type }) => {
  const [amount, setAmount] = useState(null);
  const [diff, setDiff] = useState(null);
  const [userCount, setUserCount] = useState(0);
  const [movieCount, setMovieCount] = useState(0);
  const [seriesCount, setSeriesCount] = useState(0);

  const data = widgetData.find((item) => item.type === type);

  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);

  const webseries = useSelector((state) => state.movies.series);

  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    const fetchData = async () => {
      if (type === "movies") {
        await dispatch(getQueryAsyncMovies("movies")).unwrap();
      } else if (type === "user") {
        await dispatch(getAsyncUsers()).unwrap();
      } else if (type === "webseries") {
        await dispatch(getQueryAsyncMovies("webseries")).unwrap();
      }
    };
    fetchData();
  }, [dispatch, type]);

  useEffect(() => {
    if (type === "movies" && movies.movies && Array.isArray(movies.movies)) {
      setMovieCount(movies.movies.length);
    } else if (type === "user" && users.users && Array.isArray(users.users)) {
      setUserCount(users.users.length);
    }
    if (type === "webseries" && movies && Array.isArray(movies.movies)) {
      setSeriesCount(webseries.movies.length);
      console.log(webseries.movies.length);
    }
  }, [movies, users, type]);

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"}
          {type === "user" && userCount}
          {type === "movies" && movieCount}
          {type === "webseries" && seriesCount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        {data.type !== "movies" && data.type !== "webseries" ? (
          <div className={`percentage ${diff < 0 ? "negative" : "positive"}`}>
            {diff < 0 ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
            {diff} %
          </div>
        ) : (
          <></>
        )}
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
