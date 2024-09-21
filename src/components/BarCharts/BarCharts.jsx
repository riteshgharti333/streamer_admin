import "./BarCharts.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getAllSubscriptionAsync } from "../../redux/asyncThunks/subscriptionThunks";
import { format } from "date-fns"; // Import date-fns for date formatting

export default function BarCharts({ title }) {
  const dispatch = useDispatch();
  const subscriptionData = useSelector((state) => state.subscription.data); // Assuming you have subscription data in your Redux store
  const data = [];

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      try {
        const { subscriptionData } = await dispatch(getAllSubscriptionAsync()).unwrap();
        
        const monthlyTotals = {};

        // Initialize all months
        const months = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];

        months.forEach((month) => {
          monthlyTotals[month] = {
            "Movies Subscription": 0,
            "Series Subscription": 0,
            "Movies + Series Subscription": 0,
          };
        });

        // Calculate totals for each subscription
        subscriptionData.forEach((subscription) => {
          const month = format(new Date(subscription.startDate), "MMMM");
          const planType = subscription.plan;
          const price = subscription.price;

          // Add the price to the corresponding plan
          if (monthlyTotals[month]) {
            monthlyTotals[month][planType] += price;
          }
        });

        // Convert monthlyTotals to data array
        Object.keys(monthlyTotals).forEach((month) => {
          data.push({
            date: month,
            ...monthlyTotals[month],
          });
        });

        // Sort the data by month
        const monthsOrder = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        data.sort((a, b) => monthsOrder.indexOf(a.date) - monthsOrder.indexOf(b.date));
console.log(data)
      } catch (error) {
        console.log(error);
      }
    };

    fetchSubscriptionData();
  }, [dispatch]);

  // Function to format the month in full name (e.g., "January")
  const monthTickFormatter = (tick) => tick;

  return (
    <div className="barCharts">
      <p>{title}</p>
      <ResponsiveContainer width="100%" aspect={3 / 1}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={monthTickFormatter} interval={0} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Movies Subscription" fill="red" />
          <Bar dataKey="Series Subscription" fill="yellow" />
          <Bar dataKey="Movies + Series Subscription" fill="green" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
