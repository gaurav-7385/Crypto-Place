import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../assets/logo.png";
import arrow_icon from "../assets/arrow_icon.png";
import { CoinContext } from "../context/CoinContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const { setCurrency } = React.useContext(CoinContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Runs when component mounts OR when localStorage changes
  useEffect(() => {
    const checkUser = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        return;
      }

      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          // Try to load full user from localStorage if available
          const storedUser = localStorage.getItem("user");
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          } else {
            verifyUser(token);
          }
        } else {
          handleLogout();
        }
      } catch {
        handleLogout();
      }
    };

    window.addEventListener("storage", checkUser);
    checkUser();

    return () => window.removeEventListener("storage", checkUser);
  }, []);

  const verifyUser = async (token) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        handleLogout();
      }
    } catch {
      handleLogout();
    }
  };

  const handleCurrencyChange = (e) => {
    const selectedCurrency = e.target.value;
    if (selectedCurrency === "usd") {
      setCurrency({ name: "USD", symbol: "$" });
    } else if (selectedCurrency === "eur") {
      setCurrency({ name: "EUR", symbol: "€" });
    } else if (selectedCurrency === "inr") {
      setCurrency({ name: "INR", symbol: "₹" });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.dispatchEvent(new Event("storage")); // Notify other tabs/components
    navigate("/");
  };

  return (
    <div className="navbar">
      <Link to="/" className="logo-link">
        <img src={logo} alt="Logo" className="logo" />
      </Link>

      <ul>
        <Link to="/" className="nav-link">
          <li>Home</li>
        </Link>
        <Link to="/about" className="nav-link">
          <li>About</li>
        </Link>
        <Link to="/blog" className="nav-link">
          <li>Blog</li>
        </Link>
      </ul>

      <div className="nav-right">
        <select onChange={handleCurrencyChange}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
        </select>

        {user ? (
          <>
            <span>Welcome, {user.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signup">
              <button>
                Sign Up <img src={arrow_icon} alt="arrow" />
              </button>
            </Link>
            <Link to="/login">
              <button className="login-btn">
                Login <img src={arrow_icon} alt="arrow" />
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
