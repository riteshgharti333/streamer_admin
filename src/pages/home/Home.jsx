import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { TransactionsColumns } from "../../datatablesource";
import { getAllSubscriptionAsync } from "../../redux/asyncThunks/subscriptionThunks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAsyncMovies } from "../../redux/asyncThunks/movieThunks";
import { getAsyncUsers } from "../../redux/asyncThunks/userThunks";

const Home = () => {
  const dispatch = useDispatch();

  const [subscriptionData, setSubscriptionData] = useState([]);
  const movies = useSelector((state) => state.movies.movies);

  const webseries = useSelector((state) => state.movies.series);

  const users = useSelector((state) => state.users.users);

  const [totalData, setTotalData] = useState({
    totalSubs: "",
    totalMovies: "",
    totalSeries: "",
    totalUsers: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { subscriptionData } = await dispatch(
          getAllSubscriptionAsync()
        ).unwrap();

        const { movies } = await dispatch(getAsyncMovies()).unwrap();

        const { users } = await dispatch(getAsyncUsers()).unwrap();

        const moviesData = movies.filter((movies) => {
          return movies.isSeries === false;
        });

        const seriesData = movies.filter((movies) => {
          return movies.isSeries === true;
        });

        setSubscriptionData(subscriptionData);

        // console.log(subLength);

        setTotalData({
          totalSubs: subscriptionData.length,
          totalMovies: moviesData.length,
          totalSeries: seriesData.length,
          totalUsers: users.length,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="users" totalNo={totalData.totalUsers} />
          <Widget type="movies" totalNo={totalData.totalMovies} />
          <Widget type="series" totalNo={totalData.totalSeries} />
          <Widget type="subscriptions" totalNo={totalData.totalSubs} />
        </div>
        <div className="charts">
          <Featured />
          <Chart
            title="Last 6 Months (Revenue)"
            aspect={2 / 1}
            dataArray={subscriptionData}
          />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table transactionsColumns={TransactionsColumns} />
        </div>
      </div>
    </div>
  );
};

export default Home;
