import "./table.scss";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getAllSubscriptionAsync } from "../../redux/asyncThunks/subscriptionThunks";
import { format, parseISO } from "date-fns"; // Import parseISO for parsing date strings
import { Link } from "react-router-dom";

const List = ({ transactionsColumns }) => {
  const dispatch = useDispatch();

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch subscription data
        const res = await dispatch(getAllSubscriptionAsync()).unwrap();

        // Format and sort data by latest start date first
        const formattedData = res.subscriptionData.map((subscription) => ({
          ...subscription,
          startDate: parseISO(subscription.startDate), // Convert date string to Date object
        }));

        // console.log(formattedData);

        // Sort data by latest start date
        formattedData.sort((a, b) => b.startDate - a.startDate);

        // Optionally, format dates for display if needed
        const dataToDisplay = formattedData.map((subscription) => ({
          ...subscription,
          startDate: format(subscription.startDate, "MMMM dd, yyyy"), // Format date for display
        }));

        // Update state with sorted and formatted data
        // Assuming you set this data to a state or similar
        // For example: setSortedData(dataToDisplay);

        setTransactions(dataToDisplay);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 80,
      renderCell: (params) => {
        const { _id } = params.row;
        return (
          <div className="cellAction">
            <Link to={`/subscriptions/${_id}`}>
              <div className="viewButton">View</div>
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <div className="table">
      <DataGrid
        className="datagrid"
        rows={transactions}
        columns={transactionsColumns.concat(actionColumn)}
        pageSize={9}
        getRowId={(row) => row._id}
        rowsPerPageOptions={[9]}
      />
    </div>
  );
};

export default List;
