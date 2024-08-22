import Home from "./pages/home/Home";
import Login from "./pages/Login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { movieInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import NewMovie from "./pages/newMovie/NewMovie";
import SingleMovie from "./pages/SingleMovie/SingleMovie";
import SingleList from "./pages/SingleList/SingleList";
import { movieColumns, MovieListColumns, userColumns } from "./datatablesource";
import NewList from "./pages/NewList/NewList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/Register/Register";
import { useDispatch, useSelector } from "react-redux";
import Profile from "./pages/Profile/Profile";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth)


  const RequireAuth = ({ children }) => {
    return user ? children : <Navigate to="login" />;
  };


  return (
    <div className={darkMode ? "app dark" : "app"}>

      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route path="profile" element={<Profile />} />

            {/* users */}
            <Route path="users">
              <Route
                index
                element={
                  <RequireAuth>
                    <List
                      title="Users"
                      listColumns={userColumns}
                      type="users"
                      movieType="users"
                    />
                  </RequireAuth>
                }
              />
              <Route
                path=":userId"
                element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
                }
              />
            </Route>

            {/* movies */}
            <Route path="movies">
              <Route
                index
                element={
                  <RequireAuth>
                    <List
                      title="Add New Movie"
                      type="movies"
                      listColumns={movieColumns}
                      movieType="movies"
                    />
                  </RequireAuth>
                }
              />
              <Route
                path=":moivieId"
                element={
                  <RequireAuth>
                    <SingleMovie />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <NewMovie inputs={movieInputs} title="Add New Movie" />
                  </RequireAuth>
                }
              />
            </Route>

            {/* webseries */}
            <Route path="webseries">
              <Route
                index
                element={
                  <RequireAuth>
                    <List
                      title="Add New Webseries"
                      type="webseries"
                      listColumns={movieColumns}
                      movieType="webseries"
                    />
                  </RequireAuth>
                }
              />
              <Route
                path=":moivieId"
                element={
                  <RequireAuth>
                    <SingleMovie />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <NewMovie inputs={movieInputs} title="Add New Webseries" />
                  </RequireAuth>
                }
              />
            </Route>

            {/* Lists */}
            <Route path="lists">
              <Route
                index
                element={
                  <RequireAuth>
                    <List
                      title="Add New Lists"
                      type="list"
                      listColumns={MovieListColumns}
                      movieType="lists"
                    />
                  </RequireAuth>
                }
              />
              <Route
                path=":listId"
                element={
                  <RequireAuth>
                    <SingleList />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <NewList inputs={movieInputs} title="Add New List" />
                  </RequireAuth>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={10}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
