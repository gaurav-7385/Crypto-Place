import React, { useContext, useState, useEffect } from "react";
import "./Coin.css";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext.jsx";
import LineChart from "../../components/LineChart/lineChart.jsx";

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const { currency } = useContext(CoinContext);

  const fetchHistoricalData = async () => {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            "x-cg-demo-api-key": "CG-DpfGE3sWzbw5zhBN2noMiHbg",
          },
        }
      );
      const data = await res.json();
      setHistoricalData(data);
    } catch (err) {
      console.error("Error fetching historical data:", err);
    }
  };

  const fetchCoinData = async () => {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}`,
        {
          method: "GET",
          headers: { accept: "application/json" },
        }
      );
      const data = await res.json();
      setCoinData(data);
    } catch (err) {
      console.error("Error fetching coin data:", err);
    }
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency, coinId]);

  if (!coinData || !historicalData) {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }

  return (
    <div className="coin">
      <div className="coin-name">
        <img src={coinData.image?.large} alt={coinData.name} />
        <p>
          <b>
            {coinData.name} ({coinData.symbol?.toUpperCase()})
          </b>
        </p>
      </div>
      <div className="coin-chart">
        <LineChart historicalData={historicalData} />
      </div>
      <div className="coin-info">
        <ul>
          <li>Crypto Market Rank</li>
          <li>{coinData.market_cap_rank}</li>
        </ul>
        <ul>
          <li>Current Price</li>
          <li>
            {currency.symbol}
            {coinData?.market_data?.current_price?.[
              currency.name.toLowerCase()
            ]?.toLocaleString() || "N/A"}
          </li>
        </ul>
        <ul>
          <li>Market Cap</li>
          <li>
            {currency.symbol}
            {coinData?.market_data?.market_cap?.[
              currency.name.toLowerCase()
            ]?.toLocaleString() || "N/A"}
          </li>
        </ul>
        <ul>
          <li>24 Hour High</li>
          <li>
            {currency.symbol}
            {coinData?.market_data?.high_24h?.[
              currency.name.toLowerCase()
            ]?.toLocaleString() || "N/A"}
          </li>
        </ul>
        <ul>
          <li>24 Hour Low</li>
          <li>
            {currency.symbol}
            {coinData?.market_data?.low_24h?.[
              currency.name.toLowerCase()
            ]?.toLocaleString() || "N/A"}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Coin;
