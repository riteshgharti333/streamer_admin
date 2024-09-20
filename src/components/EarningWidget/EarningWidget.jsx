import "./EarningWidget.scss";
import { Link } from "react-router-dom";
import CountUp from "react-countup";

const EarningWidget = () => {
  const totalRevenue = 20483844;

  return (
    <div className="earningWidget">
      <p className="title">Movies</p>
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
      <div className="noInfo">
      <p className="totalType">Total Movies </p>
      <p className="totalNo">5</p>
      </div>
     
      <span className="link">
        <Link>See All Users</Link>
      </span>
    </div>
  );
};

export default EarningWidget;
