import { BsArrowLeft } from "react-icons/bs";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./SingleSubscriptions.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSubscriptionAsync, getSubscriptionAsync } from "../../redux/asyncThunks/subscriptionThunks";
import { toast } from "react-toastify";


const SingleSubscriptions = () => {

  const [subscriptionData , setSubscriptionData] = useState({});

  const goBack = () => {
    navigate(-1);
  };

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname.split("/")[2];


  const subscription = useSelector((state) => state.subscription.subscription);

  useEffect(() => {
       dispatch(getSubscriptionAsync(path))
  },[dispatch , path]);

  useEffect(() => {
    if(subscription){
      setSubscriptionData(subscription)
    }
  },[subscription]);

  const {userId , name , email , customerId , subscriptionId , plan , startDate , endDate , price ,status} = subscriptionData || {};

  const deleteSubs = async (id) => {
    try {
      const resultAction = await dispatch(deleteSubscriptionAsync(id)).unwrap();
      
      const { data } = resultAction;
      
      if (data.success) {
        toast.success(data.message);
        navigate(-1);
      } else {
        toast.error('Failed to delete subscription');
      }
    } catch (error) {
      toast.error('Error deleting subscription');
      console.error('Error:', error);
    }
  };
  
  return (
    <div className="singleSubscriptions">
      <Sidebar />
      <div className="singleSubscriptionsContainer">
        <Navbar />
        <div className="prevIcon">
        <Link to="#" onClick={goBack}>
          <BsArrowLeft className="backIcon" />
        </Link>
        <button onClick={() => deleteSubs(subscriptionId)}>Delete Subscription</button>
      </div>
        <div className="singleSubscriptionsWrappper">
          <h1>Subscription Information</h1>

          <div className="subInfo">
            <p>UserId :  <span>{userId}</span></p>
            <p>Customer Name :  <span>{name}</span></p>
            <p>Cutomer Email :  <span>{email}</span></p>
            <p>Cutomer ID :  <span>{customerId}</span></p>
            <p>Subscription ID :  <span>{subscriptionId}</span></p>
            <p>Plan Name  :  <span>{plan}</span></p>
            <p>Start Date :  <span>{startDate}</span></p>
            <p>Expire Date :  <span>{endDate}</span></p>
            <p>Price :  <span>{price} /-</span></p>
            <p>Status :  <span>{status}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleSubscriptions;
