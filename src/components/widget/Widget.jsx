import "./widget.scss";
import { widgetData } from "../../datatablesource";
import { Link } from "react-router-dom";

const Widget = ({ type, totalNo }) => {
  const data = widgetData.find((item) => item.type === type);

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data?.title}</span>
        <span className="counter">{totalNo}</span>
        <span className="link">
          <Link to={`/${type}`}>{data?.link}</Link>
        </span>
      </div>
      <div className="right">{data?.icon}</div>
    </div>
  );
};

export default Widget;
