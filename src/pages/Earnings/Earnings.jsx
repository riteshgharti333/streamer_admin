import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import Chart from "../../components/chart/Chart";
import Navbar from "../../components/navbar/Navbar";
import RevenuePieChart from "../../components/RevenuePieChart/RevenuePieChart";
import Sidebar from "../../components/sidebar/Sidebar";
import "./Earnings.scss";
import EarningWidget from "../../components/EarningWidget/EarningWidget";
import { useDispatch, useSelector } from "react-redux";
import { getAllSubscriptionAsync } from "../../redux/asyncThunks/subscriptionThunks";
import { isWithinInterval, startOfMonth, subDays, subMonths } from "date-fns";
import { getAsyncUsers } from "../../redux/asyncThunks/userThunks";

const Earnings = () => {
  const totalRevenue = 20483844;

  const dispatch = useDispatch();

  const subscriptions = useSelector((state) => state.subscription);

  const [revenueData, setRevenueData] = useState({
    totalPrice: "",
    total_3_Months_Price: "",
    total_6_Months_Price: "",
    moviesTotalPrice: "",
    seriesTotalPrice: "",
    MSTotalPrice: "",
    totalMovesSubs: "",
    totalSeriesSubs: "",
    totalMSSubs: "",
    revenuePerUser: "",
    totalUsers: "",
  });

  // Reusable function to calculate total revenue for a given time range
  const calculateRevenue = (startDate, endDate, prices) => {
    const filteredSubscriptions = prices.filter((subscription) => {
      const subscriptionDate = new Date(subscription.startDate);
      return isWithinInterval(subscriptionDate, {
        start: startDate,
        end: endDate,
      });
    });

    const total = filteredSubscriptions.reduce((acc, subscription) => {
      const price = parseFloat(subscription.price);
      return !isNaN(price) ? acc + price : acc;
    }, 0);

    return total;
  };

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      try {
        const res = await dispatch(getAllSubscriptionAsync()).unwrap();

        const { users } = await dispatch(getAsyncUsers()).unwrap();

        const totalUsers = users.length;

        const prices = res.subscriptionData || [];

        //movies
        const moviesData = prices.filter((item) => {
          return item.priceId === "price_1Pt0FASGN61YzC6ZVsLPr87B";
        });

        const totalMoviesPrice = moviesData.reduce((acc, subscription) => {
          return acc + subscription.price;
        }, 0);

        const totalMoviesData = moviesData.length;

        //series
        const seriesData = prices.filter((item) => {
          return item.priceId === "price_1Pt0D9SGN61YzC6Za7Por7Fy";
        });

        const totalSeriesPrice = seriesData.reduce((acc, subscription) => {
          return acc + subscription.price;
        }, 0);

        const totalSeriesData = seriesData.length;

        //movies + series
        const MSData = prices.filter((item) => {
          return item.priceId === "price_1Pt0G5SGN61YzC6ZzRoweliJ";
        });

        const totalMSPrice = MSData.reduce((acc, subscription) => {
          return acc + subscription.price;
        }, 0);

        const totalMSData = MSData.length;

        //Last 3 month
        const currentDate = new Date();

        const startOfCurrentMonth = startOfMonth(currentDate);
        const endOfPreviousMonth = subDays(startOfCurrentMonth, 1);
        const startOfLastThreeMonths = startOfMonth(subMonths(currentDate, 3)); // First day of the month three months ago

        const endOfCurrentPeriod = endOfPreviousMonth; // Last day of the previous month
        const startOfCurrentPeriod = startOfLastThreeMonths; // First day of three months ago

        const last_3_months_Revenue = calculateRevenue(
          startOfCurrentPeriod,
          endOfCurrentPeriod,
          prices
        );

        //Last 6 month

        const startOfCurrent_6Months = startOfMonth(currentDate);
        const endOfPrevious_6Months = subDays(startOfCurrent_6Months, 1);
        const startOfLast_6Months = startOfMonth(subMonths(currentDate, 6)); // First day of the month three months ago

        const endOfCurrent_6Period = endOfPrevious_6Months; // Last day of the previous month
        const startOfCurrent_6Period = startOfLast_6Months; // First day of three months ago

        const last_6_months_Revenue = calculateRevenue(
          startOfCurrent_6Period,
          endOfCurrent_6Period,
          prices
        );

        // set_Total_6_Months_Price(last_6_months_Revenue);

        const totalPrice = prices.reduce((acc, subscription) => {
          return acc + subscription.price;
        }, 0);

        const totalRevenuePerUser = Math.round(totalPrice / totalUsers);

        // Construct pie chart data
        // const pieChartData = [
        //   { name: "Movies Subscriptions", value: totalMoviesPrice },
        //   { name: "Series Subscriptions", value: totalSeriesPrice },
        //   { name: "Movies + Series Subscriptions", value: totalMSPrice },
        // ];

        setRevenueData({
          totalPrice,
          total_3_Months_Price: last_3_months_Revenue,
          total_6_Months_Price: last_6_months_Revenue,
          moviesTotalPrice: totalMoviesPrice,
          seriesTotalPrice: totalSeriesPrice,
          MSTotalPrice: totalMSPrice,
          totalMovesSubs: totalMoviesData,
          totalSeriesSubs: totalSeriesData,
          totalMSSubs: totalMSData,
          revenuePerUser: totalRevenuePerUser,
          totalUsers: totalUsers,
          pieChartData
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchSubscriptionData();
  }, []);


  const pieChartData = [
    { name: "Movies Subcriptions", value: revenueData.moviesTotalPrice },
    { name: "Series Subcriptions", value: revenueData.seriesTotalPrice },
    { name: "Movies + Series Subcriptions", value: revenueData.MSTotalPrice },
  ];



  return (
    <div className="earnings">
      <Sidebar />
      <div className="earningsContainer">
        <Navbar />
        <div className="earningsBottom">
          <div className="top">
            <div className="topLeft">
              <div className="topLeftInfo">
                <div className="items">
                  <p>Total Revenue</p>
                  <span>
                    <CountUp
                      start={0}
                      end={revenueData.totalPrice}
                      duration={2.5}
                      separator=","
                      decimals={2}
                      prefix="₹"
                      formattingFn={(value) =>
                        new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                          maximumFractionDigits: 2,
                        }).format(value)
                      }
                    />
                  </span>
                </div>
              </div>

              <div className="leftBottomInfo">
                <div className="items">
                  <p>Last 3 Months Revenue</p>
                  <span>
                    <CountUp
                      start={0}
                      end={revenueData.total_3_Months_Price}
                      duration={2.5}
                      separator=","
                      decimals={2}
                      prefix="₹"
                      formattingFn={(value) =>
                        new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                          maximumFractionDigits: 2,
                        }).format(value)
                      }
                    />
                  </span>
                </div>

                <div className="items">
                  <p>Last 6 Months Revenue</p>
                  <span>
                    <CountUp
                      start={0}
                      end={revenueData.total_6_Months_Price}
                      duration={2.5}
                      separator=","
                      decimals={2}
                      prefix="₹"
                      formattingFn={(value) =>
                        new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                          maximumFractionDigits: 2,
                        }).format(value)
                      }
                    />
                  </span>
                </div>
              </div>
            </div>
            <div className="topRight">
              <div className="pieChart">
                <RevenuePieChart data={pieChartData} />
              </div>
            </div>
          </div>

          <div className="center">
            <div className="widgets">
              <div className="widgetsInfo">
                <EarningWidget
                  title="Revenue/User"
                  price={revenueData.revenuePerUser}
                  smTitle="Total Users"
                  totalNo={revenueData.totalUsers}
                  desc="See All Users"
                  link="users"
                />
                <EarningWidget
                  title="Movies Subcriptions"
                  price={revenueData.moviesTotalPrice}
                  smTitle="Total Movies Subcriptions"
                  totalNo={revenueData.totalMovesSubs}
                  desc="See All Movies"
                  link="movies"
                />
                <EarningWidget
                  title="Series Subcriptions"
                  price={revenueData.seriesTotalPrice}
                  smTitle="Total Series Subcriptions"
                  totalNo={revenueData.totalSeriesSubs}
                  desc="See All Series"
                  link="series"
                />
                <EarningWidget
                  title="Movies + Series Subcriptions"
                  price={revenueData.MSTotalPrice}
                  smTitle="Total Movies + Series Subcriptions"
                  totalNo={revenueData.totalMSSubs}
                  unique={true}
                />
              </div>
            </div>
          </div>

          <div className="bottom">
            <div className="charts">
              <p>This Year Revenue</p>
              <Chart aspect={3 / 1} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Earnings;
