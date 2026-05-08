import { Link, useLocation } from "react-router-dom";

function Navbar({ darkMode, setDarkMode }) {

  const location = useLocation();

  // NAVIGATION LINKS

  const navItems = [

    {
      name: "Home",
      path: "/",
    },

    {
      name: "Markets",
      path: "/markets",
    },

    {
      name: "News",
      path: "/news",
    },

    {
      name: "Learn",
      path: "/learn",
    },

  ];

  return (

    <nav className="navbar">

      {/* LOGO */}

      <Link
        to="/"
        className="logo"
      >
        <div className="logo-section">
  <img
    src="/logo.png"
    alt="TradeWise Logo"
    className="logo-img"
  />

  <h1>TradeWise</h1>
</div>
      </Link>

      {/* NAV LINKS */}

      <div className="nav-links">

        {navItems.map((item) => (

          <Link
            key={item.path}

            to={item.path}

            className={
              location.pathname === item.path
                ? "active-nav"
                : ""
            }
          >

            {item.name}

          </Link>

        ))}

      </div>

      {/* THEME TOGGLE */}

      <button
        className="theme-btn"
        onClick={() =>
          setDarkMode(!darkMode)
        }

        aria-label="Toggle Theme"
      >

        {darkMode ? "☀️" : "🌙"}

      </button>

    </nav>
  );
}

export default Navbar;