import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import CryptoCard from "../components/CryptoCard";

import { getCoins } from "../services/api";

function Home({ darkMode, setDarkMode }) {

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  // FETCH COINS

  const fetchCoins = async () => {

    try {

      setLoading(true);

      setError("");

      const data = await getCoins();

      console.log("API DATA:", data);

      if (data && data.length > 0) {

        setCoins(data);

      } else {

        setError("No crypto data found.");
      }

    } catch (err) {

      console.log("HOME ERROR:", err);

      setError("Failed to load crypto data.");

    } finally {

      setLoading(false);
    }
  };

  // INITIAL LOAD

  useEffect(() => {

    fetchCoins();

  }, []);

  // SEARCH FILTER

  const filteredCoins = coins.filter((coin) => {

    return coin.name
      .toLowerCase()
      .includes(search.toLowerCase());

  });

  return (
    <>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* HERO */}

      <div className="hero">

        <h1>
          Track Crypto Prices Live
        </h1>

        <p>
          Monitor market trends and assets in real-time.
        </p>

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

      </div>

      {/* LOADING */}

      {loading && (

        <div className="loading-section">

          <h2>Loading Coins...</h2>

        </div>

      )}

      {/* ERROR */}

      {!loading && error && (

        <div className="error-section">

          <h2>
            ⚠️ {error}
          </h2>

          <button
            className="retry-btn"
            onClick={fetchCoins}
          >
            Retry
          </button>

        </div>

      )}

      {/* COINS */}

      {!loading && !error && (

        <div className="crypto-grid">

          {filteredCoins.map((coin) => (

            <CryptoCard
              key={coin.id}
              coin={coin}
            />

          ))}

        </div>

      )}
    </>
  );
}

export default Home;