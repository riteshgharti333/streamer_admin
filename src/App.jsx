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
import { movieColumns, userColumns } from "./datatablesource";


function App() {
  const { darkMode } = useContext(DarkModeContext);

  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="login" />;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            {/* users */}
            <Route path="users">
              <Route
                index
                element={
                  <RequireAuth>
                    <List title="Users" listColumns={userColumns} />
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
                    <List title="Add New Movie" type="movies" listColumns={movieColumns} movieType="movies"/>
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
                    <List title="Add New Webseries" type="webseries" listColumns={movieColumns}  movieType="webseries"/>
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
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
