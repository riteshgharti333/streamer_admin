import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { deleteAsyncSigleMovie, getAsyncSigleMovie } from "../../redux/asyncThunks/movieThunks";

const Single = () => {

  const dispatch = useDispatch();
    // const { singleMovie, status, error } = useSelector((state) => state.movies);

    useEffect(() => {
        dispatch(getAsyncSigleMovie("654167a6dc7c4b2892e89827"));
    }, [dispatch]);


    const handleDelete = () => {
      console.log("hello")
      dispatch(deleteAsyncSigleMovie("66b8473e877260a2f799d612"));
    }

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="leftButton">
            <button className="editButton" >Edit</button>
            <button className="editButton" onClick={handleDelete}>Delete</button>
            </div>
    

            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">Jane Doe</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">janedoe@gmail.com</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">+1 2345 67 89</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                    Elton St. 234 Garden Yd. NewYork
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">USA</span>
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
          <List/>
        </div>
      </div>
    </div>
  );
};

export default Single;
