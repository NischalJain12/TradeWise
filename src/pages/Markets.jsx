import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

import { getCoins } from "../services/api";

function Markets({ darkMode, setDarkMode }) {

  const [activeTab, setActiveTab] =
    useState("gainers");

  const [coins, setCoins] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // FETCH MARKET DATA

  const fetchMarketData = async () => {

    try {

      setLoading(true);

      setError("");

      const data = await getCoins();

      if (
        data &&
        Array.isArray(data)
      ) {

        setCoins(data);

      } else {

        setCoins([]);

        setError(
          "No market data found."
        );
      }

    } catch (error) {

      console.log(
        "MARKET ERROR:",
        error
      );

      setError(
        "Failed to load market data."
      );

    } finally {

      setLoading(false);
    }
  };

  // LOAD ONLY ONCE

  useEffect(() => {

    fetchMarketData();

  }, []);

  // LOADING STATE

  if (loading) {

    return (
      <>
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <Loader />
      </>
    );
  }

  // ERROR STATE

  if (error) {

    return (
      <>
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <div className="error-section">

          <h2>
            ⚠️ {error}
          </h2>

          <button
            className="retry-btn"
            onClick={fetchMarketData}
          >
            Retry
          </button>

        </div>
      </>
    );
  }

  // TOP GAINERS

  const topGainers = [...coins]

    .sort(
      (a, b) =>

        (b.price_change_percentage_24h || 0)

        -

        (a.price_change_percentage_24h || 0)
    )

    .slice(0, 7);

  // TOP LOSERS

  const topLosers = [...coins]

    .sort(
      (a, b) =>

        (a.price_change_percentage_24h || 0)

        -

        (b.price_change_percentage_24h || 0)
    )

    .slice(0, 7);

  // MOST ACTIVE

  const mostActive = [...coins]

    .sort(
      (a, b) =>

        (b.total_volume || 0)

        -

        (a.total_volume || 0)
    )

    .slice(0, 7);

  // DISPLAY DATA

  let displayData = topGainers;

  if (activeTab === "losers") {

    displayData = topLosers;
  }

  if (activeTab === "active") {

    displayData = mostActive;
  }

  return (
    <>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="markets-page">

        <h1>
          Market Overview
        </h1>

        <p>
          Track the biggest movers
          in the market right now.
        </p>

        <div className="market-card">

          {/* TABS */}

          <div className="market-tabs">

            <button
              className={
                activeTab === "gainers"
                  ? "active-tab"
                  : ""
              }

              onClick={() =>
                setActiveTab("gainers")
              }
            >
              ↗ Top Gainers
            </button>

            <button
              className={
                activeTab === "losers"
                  ? "active-tab red-tab"
                  : ""
              }

              onClick={() =>
                setActiveTab("losers")
              }
            >
              ↘ Top Losers
            </button>

            <button
              className={
                activeTab === "active"
                  ? "active-tab blue-tab"
                  : ""
              }

              onClick={() =>
                setActiveTab("active")
              }
            >
              ∿ Most Active
            </button>

          </div>

          {/* MARKET LIST */}

          <div className="market-list">

            {displayData.map((coin) => (

              <div
                className="market-item"
                key={coin.id}
              >

                {/* LEFT */}

                <div className="market-left">

                  <div className="market-logo">

                    <img
                      src={coin.image}
                      alt={coin.name}
                    />

                  </div>

                  <div>

                    <h3>
                      {coin.name}
                    </h3>

                    <p>
                      {coin.symbol.toUpperCase()}
                    </p>

                  </div>

                </div>

                {/* RIGHT */}

                <div className="market-right">

                  <h3>

                    $

                    {Number(
                      coin.current_price || 0
                    ).toLocaleString(
                      undefined,
                      {
                        maximumFractionDigits: 2,
                      }
                    )}

                  </h3>

                  <p
                    className={
                      Number(
                        coin.price_change_percentage_24h || 0
                      ) >= 0
                        ? "green"
                        : "red"
                    }
                  >

                    {Number(
                      coin.price_change_percentage_24h || 0
                    ).toFixed(2)}
                    %

                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>

      </div>
    </>
  );
}

export default Markets;