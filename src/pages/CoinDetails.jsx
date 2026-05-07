import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";

import Loader from "../components/Loader";

import PriceChart from "../components/PriceChart";

import {
  getCoinDetails,
  getCoinChart,
} from "../services/api";

function CoinDetails({
  darkMode,
  setDarkMode,
}) {

  const { id } = useParams();

  const [coin, setCoin] =
    useState(null);

  const [chartData, setChartData] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // FETCH DATA

  useEffect(() => {

    fetchCoinData();

  }, [id]);

  const fetchCoinData =
    async () => {

      try {

        setLoading(true);

        setError("");

        // COIN DETAILS

        const coinData =
          await getCoinDetails(id);

        setCoin(coinData);

        // CHART DATA

        const chart =
          await getCoinChart(id);

        if (chart.prices) {

          setChartData(
            chart.prices
          );
        }

      } catch (err) {

        console.log(err);

        setError(
          "Failed to load coin details."
        );

      } finally {

        setLoading(false);
      }
    };

  // LOADING

  if (loading) {
    return <Loader />;
  }

  // ERROR

  if (error || !coin) {

    return (
      <>
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <div className="error-section">

          <h2>
            {error}
          </h2>

        </div>
      </>
    );
  }

  return (
    <>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="details-wrapper">

        <div className="details-page">

          {/* IMAGE */}

          <img
            src={coin.image.large}
            alt={coin.name}
            className="details-image"
          />

          {/* NAME */}

          <h1>
            {coin.name}
          </h1>

          {/* PRICE */}

          <h2>

            Current Price:

            {" $"}

            {coin.market_data.current_price.usd.toLocaleString()}

          </h2>

          {/* MARKET CAP */}

          <h3>

            Market Cap:

            {" $"}

            {coin.market_data.market_cap.usd.toLocaleString()}

          </h3>

          {/* HIGH */}

          <h3>

            24h High:

            {" $"}

            {coin.market_data.high_24h.usd.toLocaleString()}

          </h3>

          {/* LOW */}

          <h3>

            24h Low:

            {" $"}

            {coin.market_data.low_24h.usd.toLocaleString()}

          </h3>

          {/* CHANGE */}

          <h3>

            Price Change 24h:

            {" "}

            <span
              className={
                coin.market_data
                  .price_change_percentage_24h > 0
                  ? "green"
                  : "red"
              }
            >

              {coin.market_data.price_change_percentage_24h.toFixed(2)}%

            </span>

          </h3>

          {/* DESCRIPTION */}

          <p
            dangerouslySetInnerHTML={{
              __html:

                coin.description.en
                  ? coin.description.en.slice(
                      0,
                      400
                    ) + "..."
                  : "No description available.",
            }}
          ></p>

        </div>

        {/* CHART */}

        <PriceChart
          chartData={chartData}
        />

      </div>
    </>
  );
}

export default CoinDetails;