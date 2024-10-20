import "./widget.scss";
import { widgetData } from "../../datatablesource";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Widget = ({ type, totalNo, isLoading }) => {
  const data = widgetData.find((item) => item.type === type);



  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();
      const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));
      const prevMonth = new Date(new Date().setMonth(today.getMonth() - 2));

      const lastMonthQuery = query(
        collection(db, data.query),
        where("timeStamp", "<=", today),
        where("timeStamp", ">", lastMonth)
      );
      const prevMonthQuery = query(
        collection(db, data.query),
        where("timeStamp", "<=", lastMonth),
        where("timeStamp", ">", prevMonth)
      );

      const lastMonthData = await getDocs(lastMonthQuery);
      const prevMonthData = await getDocs(prevMonthQuery);

      setAmount(lastMonthData.docs.length);
      // console.log(lastMonthData.docs.length)
      setDiff(
        ((lastMonthData.docs.length - prevMonthData.docs.length) / prevMonthData.docs.length) *
          100
      );
    };
    fetchData();
  }, []);


  return (
    <div className="widget">
      <div className="left">
        {isLoading ? (
          <>
            <Skeleton height={20} width={100} />
            <Skeleton height={30} width={50} />
            <Skeleton height={15} width={150} />
          </>
        ) : (
          <>
            <span className="title">{data?.title}</span>
            <span className="counter">{totalNo}</span>
            <span className="link">
              <Link to={`/${type}`}>{data?.link}</Link>
            </span>
          </>
        )}
      </div>
      {isLoading ? (
        <Skeleton height={20} width={20} />
      ) : (
        <div className="right">{data?.icon}</div>
      )}
    </div>
  );
};

export default Widget;
