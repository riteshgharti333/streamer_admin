import { useEffect, useState } from "react";
import BarCharts from "../../components/BarCharts/BarCharts";
import Chart from "../../components/chart/Chart";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./Stats.scss";
import { useDispatch } from "react-redux";
import { getAllSubscriptionAsync } from "../../redux/asyncThunks/subscriptionThunks";

const Stats = () => {
  const dispatch = useDispatch();

  const [subData, setSubData] = useState({
     moviesData: "",
     seriesData: "",
     MSData: "",
     totalData:"",
  });


  useEffect(() => {
    const fetchSubscriptionData = async () => {
      try {
        const { subscriptionData } = await dispatch(
          getAllSubscriptionAsync()
        ).unwrap();

        //movies
        const moviesData = subscriptionData.filter((item) => {
          return item.priceId === "price_1Pt0FASGN61YzC6ZVsLPr87B";
        });

        //series
        const seriesData = subscriptionData.filter((item) => {
          return item.priceId === "price_1Pt0D9SGN61YzC6Za7Por7Fy";
        });

        //movies + series
        const MSData = subscriptionData.filter((item) => {
          return item.priceId === "price_1Pt0G5SGN61YzC6ZzRoweliJ";
        });

        setSubData({
          moviesData : moviesData,
          seriesData : seriesData,
          MSData: MSData,
          totalData:subscriptionData
        })

      } catch (error) {
        console.log(error);
      }
    };
    fetchSubscriptionData();
  }, []);

  return (
    <div className="stats">
      <Sidebar />
      <div className="statsContainer">
        <Navbar />
        <div className="statsBottom">
          <div className="top">
            <div className="left">
              <Chart title="Last 6 Months Movies (Revenue)" aspect={2 / 1} dataArray={subData.moviesData} />
            </div>

            <div className="right">
              <Chart title="Last 6 Months Series (Revenue)" aspect={2 / 1} dataArray={subData.seriesData} />
            </div>

            <div className="right">
              <Chart title="Last 6 Months Movies Series (Revenue)" aspect={2 / 1} dataArray={subData.MSData}  />
            </div>
          </div>

          <div className="center">
            <Chart title="Last 6 Months Series (Revenue)" aspect={3 / 1}  dataArray={subData.totalData}/>
          </div>

          <div className="bottom">
            <BarCharts title="Subscriptions Revenue" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
