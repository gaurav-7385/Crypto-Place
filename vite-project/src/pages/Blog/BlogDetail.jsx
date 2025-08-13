import React from "react";
import { useParams, Link } from "react-router-dom";
import "./Blog.css";

const BlogDetails = () => {
  const { id } = useParams();

  // Sample blog data (could come from API in future)
  const blogPosts = [
    {
      id: "1",
      title: "Top 5 Cryptocurrencies to Watch in 2025",
      date: "August 10, 2025",
      content: [
        "2025 is shaping up to be a remarkable year for cryptocurrency investors. With the market maturing and institutional adoption increasing, certain coins are standing out.",
        "Bitcoin remains the king of cryptocurrencies, but altcoins like Ethereum, Solana, and Polkadot are making significant strides in technology and adoption.",
        "Here are five coins you should be watching closely:",
      ],
      bullets: [
        "Bitcoin (BTC) – The most secure and widely accepted cryptocurrency.",
        "Ethereum (ETH) – Leading smart contract platform with growing DeFi ecosystem.",
        "Solana (SOL) – High-speed blockchain with low fees.",
        "Polkadot (DOT) – Interoperability-focused project linking multiple blockchains.",
        "Chainlink (LINK) – Leading oracle solution powering Web3 applications.",
      ],
      quote: "Investing without research is like sailing without a compass.",
    },
    {
      id: "2",
      title: "How to Read Crypto Market Charts",
      date: "July 28, 2025",
      content: [
        "Understanding charts is key to trading successfully. Charts help you see where the market has been and where it might be going.",
        "The most popular chart type is the candlestick chart, which shows the open, high, low, and close prices in a specific time frame.",
        "By learning basic chart patterns, you can better anticipate market movements.",
      ],
      bullets: [
        "Support & Resistance – Identify key price levels where price often bounces.",
        "Trendlines – Connect highs or lows to determine the market direction.",
        "Candlestick Patterns – Learn signals like doji, hammer, and engulfing.",
        "Volume Analysis – Understand the strength behind price movements.",
      ],
      quote: "The trend is your friend until it bends at the end.",
    },
    {
      id: "3",
      title: "Beginner’s Guide to Blockchain Technology",
      date: "July 15, 2025",
      content: [
        "Blockchain is the foundation of cryptocurrency. It's a distributed ledger technology that records transactions in a secure, transparent, and tamper-proof way.",
        "Every transaction is added to a 'block' and linked together in chronological order — hence the name blockchain.",
        "Beyond cryptocurrency, blockchain is used in supply chain, healthcare, voting systems, and more.",
      ],
      bullets: [
        "Decentralization – No single authority controls the network.",
        "Transparency – All transactions are public and verifiable.",
        "Security – Uses cryptographic techniques to prevent tampering.",
        "Efficiency – Enables peer-to-peer transactions without intermediaries.",
      ],
      quote:
        "Blockchain will do to banks what email did to the postal industry.",
    },
  ];

  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return (
      <p style={{ color: "white", textAlign: "center" }}>
        Blog post not found.
      </p>
    );
  }

  return (
    <div className="blog-details">
      <h1>{post.title}</h1>
      <span className="date">{post.date}</span>
      <p>{post.content}</p>
      <Link to="/blog" className="back-btn">
        ← Back to Blog
      </Link>
    </div>
  );
};

export default BlogDetails;
