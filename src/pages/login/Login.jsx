import "./Login.scss";
import { useContext, useState } from "react";
import { IoMdMail } from "react-icons/io";
import { BiSolidLock, BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate} from "react-router-dom";
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const {dispatch} = useContext(AuthContext);


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault()

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    dispatch({type: "LOGIN" , payload:user})
    navigate("/")
  })
  .catch((error) => {
    setError(true)
  });

  }
        
  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
        <h1><span className="f">STRE</span><span className="s">AMER</span></h1>
        </div>
      </div>
      <div className="container">
        <form className="input" onSubmit={handleLogin}>
          <h1>Login</h1>

          <div className="inputValid">
            <div className="inputType">
              <IoMdMail className="inputIcon" />
              <input
                type="email"
                autoComplete="off"
                placeholder="Email"
                name="email"
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="inputValid">
            <div className="inputType">
              <BiSolidLock className="inputIcon" />
              <input
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={e => setPassword(e.target.value)}

              />
              {showPassword ? (
                <BiHide
                  className="inputIcon"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <BiShow
                  className="inputIcon"
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
          </div>

         {error &&  <span className="warning">Wrong email or password!</span>}

          <button className="loginButton" type="submit">
            Login
          </button>
          <span>
            New to streamer
            <span className="signupLink">
              <Link to="/register"> Sign Up</Link>
            </span>
          </span>
        </form>
      </div>
    </div>
  );
}
