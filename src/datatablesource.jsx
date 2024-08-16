import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";

export const userColumns = [
  { field: "_id", headerName: "ID", width: 100 },
  {
    field: "name",
    headerName: "User",
    width: 300,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.profilePic} alt="avatar" />
          {params.row.name}
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
    field: "isAdmin",
    headerName: "Admin",
    width: 200,
  },

  // {
  //   field: "createdAt",
  //   headerName: "",
  //   width: 100,
  // },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 160,
  //   renderCell: (params) => {
  //     return (
  //       <div className={`cellWithStatus ${params.row.status}`}>
  //         {params.row.status}
  //       </div>
  //     );
  //   },
  // },
];

export const movieColumns = [
  { field: "_id", headerName: "ID", width: 70 },

  {
    field: "title",
    headerName: "Title",
    width: 230,
  },

  {
    field: "genre",
    headerName: "Genre",
    width: 200,
  },

  {
    field: "year",
    headerName: "Year",
    width: 200,
  },
  {
    field: "age",
    headerName: "Age",
    width: 100,
  },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 160,
  //   renderCell: (params) => {
  //     return (
  //       <div className={`cellWithStatus ${params.row.status}`}>
  //         {params.row.status}
  //       </div>
  //     );
  //   },
  // },
];

export const MovieListColumns = [
  { field: "_id", headerName: "ID", width: 70 },

  {
    field: "title",
    headerName: "Title",
    width: 230,
  },

  
  {
    field: "type",
    headerName: "Type",
    width: 200,
  },
  {
    field: "genre",
    headerName: "Genre",
    width: 200,
  },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 160,
  //   renderCell: (params) => {
  //     return (
  //       <div className={`cellWithStatus ${params.row.status}`}>
  //         {params.row.status}
  //       </div>
  //     );
  //   },
  // },
];

export const ListofListColumns = [
  { field: "_id", headerName: "ID", width: 70 },

  {
    field: "title",
    headerName: "Title",
    width: 230,
  },

  
  {
    field: "year",
    headerName: "Year",
    width: 200,
  },
  {
    field: "genre",
    headerName: "Genre",
    width: 200,
  },
 
];

export const widgetData = [
  {
    type: "user",
    title: "USERS",
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
    type: "movies",
    title: "MOVIES",
    link: "View all Movies",
    query: "movies",
    icon: (
      <LocalMoviesIcon
        className="icon"
        style={{
          backgroundColor: "rgba(218, 165, 32, 0.2)",
          color: "goldenrod",
        }}
      />
    ),
  },
  {
    type: "webseries",
    title: "WEB SERIES",
    link: "View all web series",
    query: "webseries",
    icon: (
      <OndemandVideoIcon
        className="icon"
        style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
      />
    ),
  },
  {
    type: "earnings",
    title: "EARNINGS",
    isMoney: true,
    link: "See details",
    query: "earnings",
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

export const genre = [
  "Action",
  "Adventure",
  "Anime",
  "Animation",
  "Comedies",
  "Documentaries",
  "Horror",
  "Romantic",
  "Sci-fi & Fantasy",
  "Sports",
  "Thrillers",
];

export const ageRestrictions = ["12", "15", "18"];
