import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import {
  getAsyncSingleUser,
  deleteAsyncSingleUser,
} from "../../redux/asyncThunks/userThunks";
import { toast } from "react-toastify";

const Single = () => {
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    dispatch(getAsyncSingleUser(path));
    // toast.success("User Deleted")
  }, [dispatch, path]);

  useEffect(() => {
    if (users && users.getUser) {
      setData(users.getUser);
    }
  }, [users]);

  const handleDelete = async () => {
    try {
      await dispatch(deleteAsyncSingleUser(path)).unwrap();
      navigate(-1);
      toast.success("User Deleted!");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="leftButton">
              <button className="editButton">Edit</button>
              <button className="editButton" onClick={handleDelete}>
                Delete
              </button>
            </div>

            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{data.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{data.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Admin:</span>
                  <span className="itemValue">
                    {data.isAdmin && "True"}

                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Single;
