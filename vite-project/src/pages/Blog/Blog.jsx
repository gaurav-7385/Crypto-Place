import React from "react";
import "./Blog.css";
import { Link } from "react-router-dom";

const Blog = () => {
  const blogPosts = [
    {
      title: "Top 5 Cryptocurrencies to Watch in 2025",
      date: "August 10, 2025",
      excerpt:
        "Discover the most promising cryptocurrencies poised for growth this year based on market trends and expert analysis.",
    },
    {
      title: "How to Read Crypto Market Charts",
      date: "July 28, 2025",
      excerpt:
        "Understanding charts is key to trading successfully. Learn the basics of candlesticks, support, and resistance.",
    },
    {
      title: "Beginner’s Guide to Blockchain Technology",
      date: "July 15, 2025",
      excerpt:
        "If you're new to blockchain, this guide will break down complex concepts into easy-to-understand explanations.",
    },
  ];

  return (
    <div className="blog">
      <div className="hero">
        <h1>Crypto Insights & News</h1>
        <p>
          Stay updated with the latest trends, tips, and guides in the crypto
          world.
        </p>
      </div>

      <div className="blog-list">
        {blogPosts.map((post, index) => (
          <div className="blog-card" key={index}>
            <h2>{post.title}</h2>
            <span className="date">{post.date}</span>
            <p>{post.excerpt}</p>
            <Link to={`/blog/${index + 1}`}>
              <button>Read More</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
