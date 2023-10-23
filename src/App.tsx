import { Email } from "./Pages/Email/Email";
import classes from "./App.module.css";
import * as React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { FavoriteEmail } from "./Pages/Email/FavoriteEmail";
import { Read } from "./Pages/Email/Read";
import { UnRead } from "./Pages/Email/UnRead";

export const AppContext = React.createContext({});

function App() {
  const [contextData, setContextData] = React.useState([]);
  const [readMsg, setReadMsg] = React.useState([]);
  const [tab, setTab] = React.useState(
    "/" + window.location.href.split("/").splice(-1)[0]
  );

  return (
    <div className={classes.container}>
      <AppContext.Provider
        value={{ contextData, setContextData, readMsg, setReadMsg, setTab }}
      >
        <Router>
          <div className={classes.header}>
            <span className={classes.tab}>Filter By:</span>
            <Link
              to="/"
              onClick={() => {
                setTab("/");
              }}
              className={tab === "/" ? classes.tabActive : classes.tab}
            >
              Home
            </Link>
            <Link
              to="/favorite"
              onClick={() => {
                setTab("/favorite");
              }}
              className={tab === "/favorite" ? classes.tabActive : classes.tab}
            >
              Favorites
            </Link>
            <Link
              to="/unread"
              onClick={() => {
                setTab("/unread");
              }}
              className={tab === "/unread" ? classes.tabActive : classes.tab}
            >
              Unread
            </Link>
            <Link
              to="/read"
              onClick={() => {
                setTab("/read");
              }}
              className={tab === "/read" ? classes.tabActive : classes.tab}
            >
              Read
            </Link>
          </div>
          <Routes>
            <Route path="/favorite" element={<FavoriteEmail />} />
            <Route path="/" element={<Email />} />
            <Route path="/read" element={<Read />} />
            <Route path="/unread" element={<UnRead />} />
          </Routes>
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
