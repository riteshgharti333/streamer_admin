import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { widgetData } from "../../datatablesource";

import { db } from "../../firebase";

const Widget = ({ type }) => {

  const [amount, setAmount] = useState(null);
  const [diff, setDiff] = useState(null);

  const data = widgetData.find((item) => item.type === type);


//  console.log(data.title)

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();
      const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));
      const prevMonth = new Date(new Date().setMonth(today.getMonth() - 2));

      const lastMonthQuery = query(
        collection(db, data.query),
        where("timeStamp", "<=", today),
        where("timeStamp", ">", lastMonth)
      );
      const prevMonthQuery = query(
        collection(db, data.query),
        where("timeStamp", "<=", lastMonth),
        where("timeStamp", ">", prevMonth)
      );

      const lastMonthData = await getDocs(lastMonthQuery);
      const prevMonthData = await getDocs(prevMonthQuery);

      setAmount(lastMonthData.docs.length);
      // console.log(lastMonthData.docs.length)
      setDiff(
        ((lastMonthData.docs.length - prevMonthData.docs.length) / prevMonthData.docs.length) *
          100
      );
    };
    fetchData();
  }, []);


  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {amount}
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
    <>
    <h1>hi</h1>
    </>
  )}
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
