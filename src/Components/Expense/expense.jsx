import React from "react";
import "./expense.css";

const Expense = ({ expense, handleClick }) => {
  return (
    <div className="expenseDiv">
      <p className="expense-title">
        Expenses: <span className="expense-money">₹{expense}</span>
      </p>
      <button
        type="button"
        className="button"
        onClick={handleClick}
      >
        + Add Expense
      </button>

      <h1>+Add Expense</h1>
    </div>
  );
};

export default Expense;
