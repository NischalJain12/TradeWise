import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "../pages/Home";
import Markets from "../pages/Markets";
import News from "../pages/News";
import Learn from "../pages/Learn";
import CoinDetails from "../pages/CoinDetails";

function AppRoutes({
  darkMode,
  setDarkMode,
}) {

  // COMMON PROPS

  const sharedProps = {
    darkMode,
    setDarkMode,
  };

  return (

    <BrowserRouter>

      <Routes>

        {/* HOME */}

        <Route
          path="/"
          element={
            <Home {...sharedProps} />
          }
        />

        {/* MARKETS */}

        <Route
          path="/markets"
          element={
            <Markets {...sharedProps} />
          }
        />

        {/* NEWS */}

        <Route
          path="/news"
          element={
            <News {...sharedProps} />
          }
        />

        {/* LEARN */}

        <Route
          path="/learn"
          element={
            <Learn {...sharedProps} />
          }
        />

        {/* COIN DETAILS */}

        <Route
          path="/coin/:id"
          element={
            <CoinDetails {...sharedProps} />
          }
        />

        {/* 404 PAGE */}

        <Route
          path="*"
          element={
            <div
              style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "32px",
                fontWeight: "bold",
              }}
            >
              404 | Page Not Found
            </div>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;