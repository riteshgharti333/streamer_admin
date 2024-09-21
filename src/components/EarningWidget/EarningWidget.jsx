import "./EarningWidget.scss";
import { Link } from "react-router-dom";
import CountUp from "react-countup";

const EarningWidget = ({
  title,
  smTitle,
  price,
  totalNo,
  desc,
  unique,
  link,
}) => {
  const titleStyle = {
    fontSize: unique ? "17px" : "20px",
    height: "30px",
  };

  

  return (
    <div className="earningWidget">
      <p className="title" style={titleStyle}>
        {title}
      </p>
      <span>
        <CountUp
          start={0}
          end={price}
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
        <p className="totalType">{smTitle} </p>
        <p className="totalNo">{totalNo}</p>
      </div>

      <span className="link">
        <Link to={`/${link}`}>{desc}</Link>
      </span>
    </div>
  );
};

export default EarningWidget;
