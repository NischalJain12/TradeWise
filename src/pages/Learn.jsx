import { useState, useEffect } from "react";

import Navbar from "../components/Navbar";

import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";

function Learn({ darkMode, setDarkMode }) {

  const STARTING_BALANCE = 100000;

  const [balance, setBalance] =
    useState(STARTING_BALANCE);

  const [holdings, setHoldings] =
    useState([]);

  const [selectedAsset, setSelectedAsset] =
    useState("Bitcoin");

  const [quantity, setQuantity] =
    useState("");

  const [tradeType, setTradeType] =
    useState("buy");

  // GRAPH DATA

  const [portfolioHistory, setPortfolioHistory] =
    useState([
      {
        time: 0,
        value: 0,
      },
    ]);

  // LIVE MARKET PRICES

  const [livePrices, setLivePrices] =
    useState({
      Bitcoin: 79821,
      Ethereum: 2294,
      Solana: 178,
      Gold: 2381,
      Tesla: 178,
      "S&P 500": 5301,
    });

  // LIVE PRICE MOVEMENT

  useEffect(() => {

    const interval = setInterval(() => {

      setLivePrices((prev) => {

        const updated = {};

        for (const asset in prev) {

          const randomMove =
            (Math.random() - 0.5) *
            (prev[asset] * 0.01);

          updated[asset] = Number(
            (
              prev[asset] + randomMove
            ).toFixed(2)
          );
        }

        return updated;
      });

    }, 2000);

    return () => clearInterval(interval);

  }, []);

  const currentPrice =
    livePrices[selectedAsset];

  // INVESTED VALUE

  const investedValue =
    holdings.reduce(
      (total, item) =>
        total +
        item.quantity *
          livePrices[item.asset],
      0
    );

  // TOTAL PORTFOLIO VALUE

  const totalWorth =
    balance + investedValue;

  // PROFIT / LOSS

  const profitLoss =
    totalWorth -
    STARTING_BALANCE;

  // LIVE GRAPH

  useEffect(() => {

    const graphInterval =
      setInterval(() => {

        setPortfolioHistory((prev) => {

          const updated = [
            ...prev,

            {
              time: prev.length,

              value: Number(
                profitLoss.toFixed(2)
              ),
            },
          ];

          // keep latest 20 points

          if (updated.length > 20) {
            updated.shift();
          }

          return updated;
        });

      }, 2000);

    return () =>
      clearInterval(graphInterval);

  }, [profitLoss]);

  // BUY / SELL

  const executeTrade = () => {

    if (!quantity || quantity <= 0)
      return;

    const qty = Number(quantity);

    const totalCost =
      qty * currentPrice;

    // BUY

    if (tradeType === "buy") {

      if (totalCost > balance) {

        alert("Not enough balance");

        return;
      }

      setBalance(
        balance - totalCost
      );

      const existing =
        holdings.find(
          (item) =>
            item.asset ===
            selectedAsset
        );

      if (existing) {

        setHoldings(
          holdings.map((item) =>
            item.asset ===
            selectedAsset
              ? {
                  ...item,

                  quantity:
                    item.quantity +
                    qty,
                }
              : item
          )
        );

      } else {

        setHoldings([
          ...holdings,

          {
            asset:
              selectedAsset,

            quantity: qty,

            avgPrice:
              currentPrice,
          },
        ]);
      }

    }

    // SELL

    else {

      const existing =
        holdings.find(
          (item) =>
            item.asset ===
            selectedAsset
        );

      if (
        !existing ||
        existing.quantity < qty
      ) {

        alert(
          "Not enough holdings"
        );

        return;
      }

      setBalance(
        balance + totalCost
      );

      const updatedHoldings =
        holdings
          .map((item) =>
            item.asset ===
            selectedAsset
              ? {
                  ...item,

                  quantity:
                    item.quantity -
                    qty,
                }
              : item
          )
          .filter(
            (item) =>
              item.quantity > 0
          );

      setHoldings(
        updatedHoldings
      );
    }

    setQuantity("");
  };

  return (
    <>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="learn-page">

        {/* HEADER */}

        <div className="learn-header">

          <div>

            <span className="learn-badge">
              ● Live Simulated Environment
            </span>

            <h1>Paper Trading</h1>

            <p>
              Learn trading risk-free
              with virtual money.
            </p>

          </div>

          <button
            className="reset-btn"
            onClick={() => {

              setBalance(
                STARTING_BALANCE
              );

              setHoldings([]);

              setPortfolioHistory([
                {
                  time: 0,
                  value: 0,
                },
              ]);

            }}
          >
            Reset Account
          </button>

        </div>

        {/* STATS */}

        <div className="learn-stats">

          <div className="stat-card">

            <h4>Total Net Worth</h4>

            <h2>
              $
              {totalWorth.toLocaleString()}
            </h2>

          </div>

          <div className="stat-card">

            <h4>
              Purchasing Power (Cash)
            </h4>

            <h2>
              $
              {balance.toLocaleString()}
            </h2>

          </div>

          <div className="stat-card">

            <h4>Profit / Loss</h4>

            <h2
              style={{
                color:
                  profitLoss >= 0
                    ? "#22c55e"
                    : "#ef4444",
              }}
            >
              {profitLoss >= 0
                ? "+"
                : ""}
              $
              {profitLoss.toFixed(2)}
            </h2>

          </div>

        </div>

        {/* MAIN GRID */}

        <div className="learn-grid">

          {/* LEFT SIDE */}

          <div>

            {/* HOLDINGS */}

            <div className="holdings-card">

              <h2>Your Holdings</h2>

              {holdings.length === 0 ? (

                <div className="empty-holdings">
                  You don't own any assets yet.
                </div>

              ) : (

                <table>

                  <thead>

                    <tr>

                      <th>Asset</th>

                      <th>Quantity</th>

                      <th>Avg Price</th>

                      <th>Live Price</th>

                      <th>Total Value</th>

                    </tr>

                  </thead>

                  <tbody>

                    {holdings.map(
                      (item) => (

                        <tr
                          key={item.asset}
                        >

                          <td>
                            {item.asset}
                          </td>

                          <td>
                            {item.quantity}
                          </td>

                          <td>
                            $
                            {item.avgPrice}
                          </td>

                          <td>
                            $
                            {
                              livePrices[
                                item.asset
                              ]
                            }
                          </td>

                          <td>

                            $

                            {(
                              item.quantity *
                              livePrices[
                                item.asset
                              ]
                            ).toFixed(2)}

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              )}

            </div>

            {/* GRAPH */}

            <div className="chart-card">

              <div className="chart-header">

                <h2>
                  Portfolio Performance
                </h2>

                <p>
                  Real-time profit &
                  loss tracking.
                </p>

              </div>

              <ResponsiveContainer
                width="100%"
                height={350}
              >

                <AreaChart
                  data={
                    portfolioHistory
                  }
                >

                  <defs>

                    <linearGradient
                      id="colorValue"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >

                      <stop
                        offset="0%"
                        stopColor={
                          profitLoss >= 0
                            ? "#22c55e"
                            : "#ef4444"
                        }
                        stopOpacity={0.4}
                      />

                      <stop
                        offset="100%"
                        stopColor={
                          profitLoss >= 0
                            ? "#22c55e"
                            : "#ef4444"
                        }
                        stopOpacity={0}
                      />

                    </linearGradient>

                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#1e293b"
                  />

                  <XAxis
                    dataKey="time"
                    stroke="#94a3b8"
                  />

                  <YAxis
                    stroke="#94a3b8"
                    domain={["auto", "auto"]}
                  />

                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={
                      profitLoss >= 0
                        ? "#22c55e"
                        : "#ef4444"
                    }
                    strokeWidth={4}
                    fill="url(#colorValue)"
                    animationDuration={1000}
                  />

                </AreaChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* TRADE DESK */}

          <div className="trade-card">

            <h2>Trade Desk</h2>

            <label>
              Select Asset
            </label>

            <select
              value={selectedAsset}
              onChange={(e) =>
                setSelectedAsset(
                  e.target.value
                )
              }
            >

              {Object.keys(
                livePrices
              ).map((asset) => (

                <option
                  key={asset}
                  value={asset}
                >
                  {asset}
                </option>

              ))}

            </select>

            <div className="live-price">

              <span>Live Price</span>

              <h3>
                ${currentPrice}
              </h3>

            </div>

            <div className="trade-tabs">

              <button
                className={
                  tradeType === "buy"
                    ? "active-buy"
                    : ""
                }
                onClick={() =>
                  setTradeType("buy")
                }
              >
                BUY
              </button>

              <button
                className={
                  tradeType === "sell"
                    ? "active-sell"
                    : ""
                }
                onClick={() =>
                  setTradeType("sell")
                }
              >
                SELL
              </button>

            </div>

            <label>
              Quantity
            </label>

            <input
              type="number"
              placeholder="0.00"
              value={quantity}
              onChange={(e) =>
                setQuantity(
                  e.target.value
                )
              }
            />

            <div className="trade-total">

              <span>Total Cost</span>

              <strong>

                $

                {quantity
                  ? (
                      quantity *
                      currentPrice
                    ).toFixed(2)
                  : "0.00"}

              </strong>

            </div>

            <button
              className={
                tradeType === "buy"
                  ? "buy-btn"
                  : "sell-btn"
              }
              onClick={executeTrade}
            >

              {tradeType === "buy"
                ? `BUY ${selectedAsset}`
                : `SELL ${selectedAsset}`}

            </button>

          </div>

        </div>

      </div>
    </>
  );
}

export default Learn;