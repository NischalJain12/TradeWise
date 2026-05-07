import Navbar from "../components/Navbar";

function News({ darkMode, setDarkMode }) {

  const news = [

    {
      title: "Bitcoin crosses $80,000 amid ETF demand",
      source: "CoinDesk",
      time: "2 hours ago",
      image:
        "https://images.unsplash.com/photo-1518546305927-5a555bb7020d",
    },

    {
      title: "Ethereum gas fees hit monthly low",
      source: "CryptoSlate",
      time: "4 hours ago",
      image:
        "https://images.unsplash.com/photo-1621761191319-c6fb62004040",
    },

    {
      title: "US stock market rallies after Fed statement",
      source: "Bloomberg",
      time: "5 hours ago",
      image:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3",
    },

    {
      title: "Solana ecosystem continues rapid growth",
      source: "CoinTelegraph",
      time: "7 hours ago",
      image:
        "https://images.unsplash.com/photo-1639762681057-408e52192e55",
    },

  ];

  return (
    <>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="news-page">

        <div className="news-header">

          <h1>
            Latest Crypto & Finance News
          </h1>

          <p>
            Real-time updates from crypto,
            stock market, and business world.
          </p>

        </div>

        <div className="news-grid">

          {news.map((item, index) => (

            <div className="news-card" key={index}>

              <img
                src={item.image}
                alt={item.title}
              />

              <div className="news-content">

                <h2>{item.title}</h2>

                <div className="news-source">

                  <span>{item.source}</span>

                  <span>{item.time}</span>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </>
  );
}

export default News;