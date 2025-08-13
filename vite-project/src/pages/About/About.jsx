import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about">
      <div className="hero">
        <h1>About CryptoPlace</h1>
        <p>
          CryptoPlace is your one-stop marketplace for cryptocurrency tracking,
          analysis, and insights. We provide real-time data, price trends, and
          market statistics to help you make informed decisions in the crypto
          world.
        </p>
      </div>

      <div className="about-content">
        <section>
          <h2>Our Mission</h2>
          <p>
            To make cryptocurrency data accessible, transparent, and easy to
            understand for everyone — from beginners to professional traders.
          </p>
        </section>

        <section>
          <h2>Why Choose Us?</h2>
          <ul>
            <li>Real-time market updates</li>
            <li>Wide coverage of coins and tokens</li>
            <li>User-friendly interface</li>
            <li>Global currency support</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About;
