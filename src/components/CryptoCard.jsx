import { Link } from "react-router-dom";

function CryptoCard({ coin }) {

  return (

    <Link
      to={`/coin/${coin.id}`}
      className="card-link"
    >

      <div className="crypto-card">

        {/* COIN IMAGE */}

        <img
          src={coin.image}
          alt={coin.name}

          onError={(e) => {

            e.target.src =
              "https://via.placeholder.com/80";

          }}
        />

        {/* COIN NAME */}

        <h2>
          {coin.name || "Unknown Coin"}
        </h2>

        {/* SYMBOL */}

        <p>

          Symbol:

          {" "}

          {coin.symbol
            ? coin.symbol.toUpperCase()
            : "N/A"}

        </p>

        {/* PRICE */}

        <h3>

          $

          {Number(
            coin.current_price || 0
          ).toLocaleString()}

        </h3>

        {/* PRICE CHANGE */}

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

    </Link>
  );
}

export default CryptoCard;