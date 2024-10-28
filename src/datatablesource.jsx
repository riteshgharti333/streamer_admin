import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import PersonIcon from "@mui/icons-material/Person";
<<<<<<< HEAD

import { format } from "date-fns";
=======
>>>>>>> f9c7e66 (add create list slice)

export const userColumns = [
  { field: "_id", headerName: "ID", width: 100 },

  {
    field: "name",
    headerName: "User",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.profilePic ? (
            <img className="cellImg" src={params.row.profilePic} alt="avatar" />
          ) : (
            <PersonIcon style={{ fontSize: 30 }} />
          )}
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

//temporary data
export const userRows = [
  {
    id: 1,
    username: "Snow",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    status: "active",
    email: "1snow@gmail.com",
    age: 35,
  },
  {
<<<<<<< HEAD
    id: 2,
    username: "Jamie Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "2snow@gmail.com",
    status: "passive",
    age: 42,
  },
  {
    id: 3,
    username: "Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "3snow@gmail.com",
    status: "pending",
    age: 45,
=======
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
    field: "isSeries",
    headerName: "Web Series",
    width: 230,
>>>>>>> f9c7e66 (add create list slice)
  },

  // {
  //   field: "year",
  //   headerName: "Year",
  //   width: 200,
  // },
  {
    field: "genre",
    headerName: "Genre",
    width: 200,
  },
];

export const ListofListSColumns = [
  { field: "_id", headerName: "ID", width: 70 },

  {
    field: "title",
    headerName: "Title",
    width: 230,
  },

  {
    field: "isSeries",
    headerName: "Web Series",
    width: 150,
  },

  // {
  //   field: "year",
  //   headerName: "Year",
  //   width: 200,
  // },
  {
<<<<<<< HEAD
    id: 4,
    username: "Stark",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "4snow@gmail.com",
    status: "active",
    age: 16,
=======
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
>>>>>>> f9c7e66 (add create list slice)
  },
  {
    id: 5,
    username: "Targaryen",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "5snow@gmail.com",
    status: "passive",
    age: 22,
  },
  {
    id: 6,
    username: "Melisandre",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "6snow@gmail.com",
    status: "active",
    age: 15,
  },
  {
    id: 7,
    username: "Clifford",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "7snow@gmail.com",
    status: "passive",
    age: 44,
  },
  {
    id: 8,
    username: "Frances",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "8snow@gmail.com",
    status: "active",
    age: 36,
  },
  {
    id: 9,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "pending",
    age: 65,
  },
  {
    id: 10,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "active",
    age: 65,
  },
];

export const genre = [
  "Action",
  "Adventure",
  "Anime",
  "Animation",
  "TV Dramas",
  "Documentaries",
  "Horror",
  "Romantic",
  "Sci-fi",
  "Fantasy",
  "Sports",
  "Thrillers",
];

export const ageRestrictions = ["All", "12", "15", "18"];
