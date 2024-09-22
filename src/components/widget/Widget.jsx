import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { widgetData } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllSubscriptionAsync } from "../../redux/asyncThunks/subscriptionThunks";
import { getAsyncMovies } from "../../redux/asyncThunks/movieThunks";

const Widget = ({ type, totalNo }) => {
  const data = widgetData.find((item) => item.type === type);


  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data?.title}</span>
        <span className="counter">
           {totalNo}
        </span>
        <span className="link">
          <Link to={`/${type}`}>{data?.link}</Link>
        </span>
      </div>
      <div className="right">{data?.icon}</div>
    </div>
  );
};

export default Widget;
