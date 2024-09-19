import "./navbar.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useSelector } from "react-redux";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { darkMode, dispatch } = useContext(DarkModeContext);

  return (
    <div className="navbar">
      <div className="wrapper">
    
        <div className="items">
          <div className="item">
            {darkMode ? (
              <LightModeIcon
                className="icon"
                onClick={() => dispatch({ type: "TOGGLE" })}
              />
            ) : (
              <DarkModeOutlinedIcon
                className="icon"
                onClick={() => dispatch({ type: "TOGGLE" })}
              />
            )}
          </div>
          <div className="item">
            <Link to={"/profile"}>
              <PersonIcon className="userIcon" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
