import React, { useState } from "react";
import "./balance.css";

const WalletBalance = ({ money, handleClick }) => {
  return (
    <>
      <div className="balanceDiv">
        <p className="walletBalance-Title">
          Wallet Balance: <span className="walletMoney">₹{money}</span>
        </p>
        <button
          type="button"
          className="button"
          onClick={handleClick}
        >
          + Add Income
        </button>
        <h1>+Add Balance</h1>
      </div>
    </>
  );
};

export default WalletBalance;
