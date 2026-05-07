const BASE_URL =
  "https://api.coingecko.com/api/v3";

// ================= GET ALL COINS =================

export const getCoins = async () => {

  try {

    const response = await fetch(

      `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false`

    );

    if (!response.ok) {

      throw new Error("API Error");
    }

    const data = await response.json();

    return data;

  } catch (error) {

    console.log(
      "GET COINS ERROR:",
      error
    );

    // FALLBACK STATIC DATA

    return [

      {
        id: "bitcoin",
        name: "Bitcoin",
        symbol: "btc",
        image:
          "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
        current_price: 65000,
        price_change_percentage_24h: 2.5,
      },

      {
        id: "ethereum",
        name: "Ethereum",
        symbol: "eth",
        image:
          "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
        current_price: 3200,
        price_change_percentage_24h: -1.2,
      },

      {
        id: "solana",
        name: "Solana",
        symbol: "sol",
        image:
          "https://assets.coingecko.com/coins/images/4128/large/solana.png",
        current_price: 145,
        price_change_percentage_24h: 4.1,
      },

      {
        id: "dogecoin",
        name: "Dogecoin",
        symbol: "doge",
        image:
          "https://assets.coingecko.com/coins/images/5/large/dogecoin.png",
        current_price: 0.15,
        price_change_percentage_24h: 1.8,
      },

      {
        id: "ripple",
        name: "XRP",
        symbol: "xrp",
        image:
          "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png",
        current_price: 0.60,
        price_change_percentage_24h: -0.7,
      },
    ];
  }
};

// ================= GET SINGLE COIN =================

export const getCoinDetails = async (id) => {

  try {

    const response = await fetch(
      `${BASE_URL}/coins/${id}`
    );

    if (!response.ok) {
      throw new Error("Coin Error");
    }

    return await response.json();

  } catch (error) {

    console.log(
      "DETAIL ERROR:",
      error
    );

    return null;
  }
};

// ================= GET CHART DATA =================

export const getCoinChart = async (id) => {

  try {

    const response = await fetch(

      `${BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=7`

    );

    if (!response.ok) {
      throw new Error("Chart Error");
    }

    return await response.json();

  } catch (error) {

    console.log(
      "CHART ERROR:",
      error
    );

    return {
      prices: [],
    };
  }
};