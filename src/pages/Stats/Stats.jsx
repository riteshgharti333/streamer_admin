import Chart from "../../components/chart/Chart";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./Stats.scss";

const Stats = () => {
  return (
    <div className="stats">
      <Sidebar />
      <div className="statsContainer">
        <Navbar />
        <div className="statsBottom">
          <div className="top">
            <div className="left">
              <Chart title="Last 6 Months Movies (Revenue)" aspect={2 / 1} />
            </div>

            <div className="right">
              <Chart title="Last 6 Months Series (Revenue)" aspect={2 / 1} />
            </div>

            <div className="right">
              <Chart title="Last 6 Months Series (Revenue)" aspect={2 / 1} />
            </div>
          </div>

          <div className="bottom">
            <Chart title="Last 6 Months Series (Revenue)" aspect={3 / 1} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
