import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { widgetData } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllSubscriptionAsync } from "../../redux/asyncThunks/subscriptionThunks";
import { getAsyncMovies } from "../../redux/asyncThunks/movieThunks";

const Widget = ({ type }) => {
  const [amount, setAmount] = useState(null);
  const [diff, setDiff] = useState(null);
  const [userCount, setUserCount] = useState(0);
  const [movieCount, setMovieCount] = useState(0);
  const [seriesCount, setSeriesCount] = useState(0);

  const [totalSusbcriptions, setTotalSubscriptios] = useState(0);

  const data = widgetData.find((item) => item.type === type);

  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);

  const webseries = useSelector((state) => state.movies.series);

  const users = useSelector((state) => state.users.users);

  const subscriptions = useSelector((state) => state.subscription);

  useEffect(() => {
    // if(!movies && !webseries){
    dispatch(getAsyncMovies(type));
    // }
  }, [dispatch, type]);

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      try {
        const res = await dispatch(getAllSubscriptionAsync()).unwrap();

        setTotalSubscriptios(res.subscriptionData.length);
      } catch (error) {
        console.error("Failed to fetch subscription data:", error); // Handle errors
      }
    };

    fetchSubscriptionData();
  }, [dispatch]);

  useEffect(() => {
    if (type === "movies" && movies.movies && Array.isArray(movies.movies)) {
      setMovieCount(movies.movies.length);
    } else if (type === "users" && users.users && Array.isArray(users.users)) {
      setUserCount(users.users.length);
    }
    if (type === "series" && movies && Array.isArray(webseries.movies)) {
      setSeriesCount(webseries.movies.length);
    }
  }, [movies, users, type]);

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data?.title}</span>
        <span className="counter">
          {type === "users" && userCount}
          {type === "movies" && movieCount}
          {type === "series" && seriesCount}
          {type === "subscriptions" && totalSusbcriptions}
        </span>
        <span className="link">
          <Link to={`/${type}`}>{data?.link}</Link>
        </span>
      </div>
      <div className="right">
        {data?.icon}
      </div>
    </div>
  );
};

export default Widget;
