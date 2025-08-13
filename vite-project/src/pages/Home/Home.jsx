import React, { useEffect, useState } from "react";
import "./Home.css";
import { CoinContext } from "../../context/CoinContext.jsx";
import { Link } from "react-router-dom";

const Home = () => {
  const { allCoins, currency } = React.useContext(CoinContext);
  const [displayCoins, setDisplayCoins] = React.useState([]);
  const [input, setInput] = useState("");

  const inputHandler = (e) => {
    setInput(e.target.value);
    if (e.target.value === "") {
      setDisplayCoins(allCoins);
    }
  };
  const searchHandler = async (e) => {
    e.preventDefault();
    const coins = await allCoins.filter((item) => {
      return (
        item.name.toLowerCase().includes(input.toLowerCase()) ||
        item.symbol.toLowerCase().includes(input.toLowerCase())
      );
    });
    setDisplayCoins(coins);

    console.log("Search results:", coins);
  };

  useEffect(() => {
    if (Array.isArray(allCoins)) {
      console.log("allCoins from context:", allCoins);
      setDisplayCoins(allCoins);
    }
  }, [allCoins]);

  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br /> Crypto MarketPlace
        </h1>
        <p>
          Welcome to the World's largest CryptoCurrency marketplace.Sign up to
          explore more about cryptos.
        </p>
        <form onSubmit={searchHandler}>
          <input
            list="coinlist"
            onChange={inputHandler}
            value={input}
            type="text"
            placeholder="Search for a coin..."
            required
          />
          <datalist id="coinlist">
            {allCoins.map((item, index) => (
              <option key={index} value={item.name} />
            ))}
          </datalist>
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p className="market-cap">Market Cap</p>
        </div>
        {displayCoins?.slice(0, 10).map((item, index) => (
          <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
            <p>{item.market_cap_rank}</p>
            <div>
              <img src={item.image} alt={item.name} />
              <p>{item.name + " - " + item.symbol}</p>
            </div>
            <p>
              {currency.symbol} {item.current_price.toLocaleString()}
            </p>
            <p
              className={item.price_change_percentage_24h > 0 ? "green" : "red"}
            >
              {Math.floor(item.price_change_percentage_24h * 100) / 100}
            </p>
            <p className="market-cap">
              {currency.symbol}
              {item.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
