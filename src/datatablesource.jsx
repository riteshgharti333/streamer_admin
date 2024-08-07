import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "address",
    headerName: "Address",
    width: 100,
  },

  
  {
    field: "country",
    headerName: "Country",
    width: 100,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];





export const widgetData = [
  {
    type: "user",
    title: "USERS",
    isMoney: false,
    link: "See all users",
    query: "users",
    icon: (
      <PersonOutlinedIcon
        className="icon"
        style={{
          color: "crimson",
          backgroundColor: "rgba(255, 0, 0, 0.2)",
        }}
      />
    ),
  },
  {
    type: "order",
    title: "ORDERS",
    isMoney: false,
    link: "View all orders",
    query: "orders",
    icon: (
      <ShoppingCartOutlinedIcon
        className="icon"
        style={{
          backgroundColor: "rgba(218, 165, 32, 0.2)",
          color: "goldenrod",
        }}
      />
    ),
  },
  {
    type: "earning",
    title: "EARNINGS",
    isMoney: true,
    link: "View net earnings",
    query: "earnings",
    icon: (
      <MonetizationOnOutlinedIcon
        className="icon"
        style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
      />
    ),
  },
  {
    type: "balance",
    title: "BALANCE",
    isMoney: true,
    link: "See details",
    query: "balances",
    icon: (
      <AccountBalanceWalletOutlinedIcon
        className="icon"
        style={{
          backgroundColor: "rgba(128, 0, 128, 0.2)",
          color: "purple",
        }}
      />
    ),
  },
];
