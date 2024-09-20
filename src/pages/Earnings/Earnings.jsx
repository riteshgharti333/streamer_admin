import React from "react";
import CountUp from "react-countup";
import Chart from "../../components/chart/Chart";
import Navbar from "../../components/navbar/Navbar";
import RevenuePieChart from "../../components/RevenuePieChart/RevenuePieChart";
import Sidebar from "../../components/sidebar/Sidebar";
import "./Earnings.scss";
import EarningWidget from "../../components/EarningWidget/EarningWidget";

const Earnings = () => {
  const totalRevenue = 20483844; // Static total revenue value

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
                    end={totalRevenue}
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
                        end={totalRevenue}
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
                    <p>Last 3 Months Revenue</p>
                    <span>
                      {" "}
                      <CountUp
                        start={0}
                        end={totalRevenue}
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
              <div className="topRightInfo">
                <div className="pieInfo">
                  <p> Revenue Pie Chart</p>
                  <div className="plans">
                    <p>
                      <span className="dot"></span>Movies Subscriptions
                    </p>
                    <p>
                      <span className="dot"></span>Series Subscriptions
                    </p>
                    <p>
                      <span className="dot"></span>Movies + Series Subscriptions
                    </p>
                  </div>
                </div>

                <div className="pieChart">
                  <RevenuePieChart />
                </div>
              </div>
            </div>
          </div>

          <div className="center">
            <div className="widgets">
              <div className="widgetsInfo">
                <EarningWidget />
                <EarningWidget />
                <EarningWidget />
                <EarningWidget />
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
