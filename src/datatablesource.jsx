import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';



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

export const movieColumns = [
  { field: "id", headerName: "ID", width: 70 },
  // {
  //   field: "movies",
  //   headerName: "Movies",
  //   width: 230,
  //   renderCell: (params) => {
  //     return (
  //       <div className="cellWithImg">
  //         <img className="cellImg" src={params.row.img} alt="avatar" />
  //         {params.row.username}
  //       </div>
  //     );
  //   },
  // },
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
  "Thrillers"
]


export const ageRestrictions = ["12", "15", "18"];