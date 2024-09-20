import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { SubscriptionsColumns } from "../../datatablesource";

import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  getAsyncSingleUser,
  deleteAsyncSingleUser,
  updateAsyncSingleUser,
} from "../../redux/asyncThunks/userThunks";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import { getAllSubscriptionAsync } from "../../redux/asyncThunks/subscriptionThunks";
import { format, parseISO } from "date-fns";
import UserChart from "../../components/UserChart/UserChart";

const Single = () => {
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const users = useSelector((state) => state.users.users);

  const [roleAdmin, setRoleAdmin] = useState(false);

  const subscriptions = useSelector((state) => state.subscription);

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    dispatch(getAsyncSingleUser(path));
  }, [dispatch, path]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (users && users.userDetails && users.userDetails.subscription) {
          setData(users.userDetails.getUser);

          const usersSubscriptions = users.userDetails.subscription;

          const formattedData = usersSubscriptions.map((subscription) => ({
            ...subscription,
            startDate: parseISO(subscription.startDate), // Convert date string to Date object
          }));

          formattedData.sort((a, b) => b.startDate - a.startDate);

          const dataToDisplay = formattedData.map((subscription) => ({
            ...subscription,
            startDate: format(subscription.startDate, "MMMM dd, yyyy"), // Format date for display
          }));

          setTransactions(dataToDisplay);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch, users]);

  const handleDelete = async () => {
    try {
      await dispatch(deleteAsyncSingleUser(path)).unwrap();
      navigate(-1);
      toast.success("User Deleted!");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  // Function to handle updating the admin role
  const handleAdminUpdate = async (isAdmin) => {
    try {
      const updatedUser = { isAdmin };

      await dispatch(updateAsyncSingleUser({ id: path, updatedUser })).unwrap();
      setData((prevData) => ({
        ...prevData,
        isAdmin: isAdmin,
      }));
      toast.success(
        `User has been ${isAdmin ? "granted" : "removed from"} admin role.`
      );
      setRoleAdmin(false);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };


  const AdminRole = () => {
    return (
      <div className="admin">
        <div className="adminInfo">
          <p>
            Do you want to {data.isAdmin ? "remove from " : "assign the"} Admin
            role?
          </p>
          <div className="adminButton">
            <button onClick={() => setRoleAdmin(false)}>No</button>
            <button onClick={() => handleAdminUpdate(!data.isAdmin)}>
              Yes
            </button>
          </div>
        </div>
      </div>
    );
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
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
    <div className="single">
      {roleAdmin && <AdminRole />}

      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="leftTop">
              <h1 className="leftTitle">Information</h1>
              <button className="editButton" onClick={handleDelete}>
                Delete User
              </button>
            </div>
            <div className="item">
              <div className="details">
                <h1 className="itemTitle">{data.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{data.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Admin:</span>
                  <span className="itemValue">
                    {data.isAdmin ? "True" : "False"}
                  </span>
                  {data.isAdmin ? (
                    <p onClick={() => setRoleAdmin(true)} className="adminRole">
                      Remove From Admin Role
                    </p>
                  ) : (
                    <p
                      onClick={() => setRoleAdmin(true)}
                      className="adminRole assign"
                    >
                      Assign Admin Role
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <UserChart aspect={3 / 1} title="User Spending" userId={data._id} />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          {/* <DataGrid
            className="datagrid"
            rows={transactions}
            columns={SubscriptionsColumns.concat(actionColumn)}
            pageSize={9}
            getRowId={(row) => row._id}
            rowsPerPageOptions={[9]}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Single;
