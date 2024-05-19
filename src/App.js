import "./App.css";
import WalletBalance from "./Components/Balance/balance";
import Expense from "./Components/Expense/expense";

import Modal from "./Components/Model/Model";
import BalanceForm from "./Components/Forms/BalanceForm";
import ExpenseForm from "./Components/Forms/ExpenseForm";

import { useEffect, useState } from "react";

import TransactionList from "./Components/TransactionList/TransactionList";

import BarChart from "./Components/Barchart/BarChart";

// import Chart from "./Components/Chart/chart";
import PieChart from "./Components/PieChart/PieChart";

function App() {
  const [balance, setBalance] = useState(500);
  const [expense, setExpense] = useState(0);
  const [isOpenExpense, setIsOpenExpense] = useState(false);
  const [isOpenBalance, setIsOpenBalance] = useState(false);

  const [expenseList, setExpenseList] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  const [categorySpends, setCategorySpends] = useState({
    food: 0,
    entertainment: 0,
    travel: 0,
  });
  const [categoryCount, setCategoryCount] = useState({
    food: 0,
    entertainment: 0,
    travel: 0,
  });

  useEffect(() => {
    //Check localStorage
    const localBalance = localStorage.getItem("balance");

    if (localBalance) {
      setBalance(Number(localBalance));
    } else {
      setBalance(5000);
      localStorage.setItem("balance", 5000);
    }

    const items = JSON.parse(localStorage.getItem("expenses"));

    setExpenseList(items || []);
    setIsMounted(true);
  }, []);

  // saving expense list in localStorage
  useEffect(() => {
    if (expenseList.length > 0 || isMounted) {
      localStorage.setItem("expenses", JSON.stringify(expenseList));
    }

    if (expenseList.length > 0) {
      setExpense(
        expenseList.reduce(
          (accumulator, currentValue) =>
            accumulator + Number(currentValue.price),
          0
        )
      );
    } else {
      setExpense(0);
    }

    let foodSpends = 0,
      entertainmentSpends = 0,
      travelSpends = 0;
    let foodCount = 0,
      entertainmentCount = 0,
      travelCount = 0;

    expenseList.forEach((item) => {
      if (item.category == "food") {
        foodSpends += Number(item.price);
        foodCount++;
      } else if (item.category == "entertainment") {
        entertainmentSpends += Number(item.price);
        entertainmentCount++;
      } else if (item.category == "travel") {
        travelSpends += Number(item.price);
        travelCount++;
      }
    });

    setCategorySpends({
      food: foodSpends,
      travel: travelSpends,
      entertainment: entertainmentSpends,
    });

    setCategoryCount({
      food: foodCount,
      travel: travelCount,
      entertainment: entertainmentCount,
    });
  }, [expenseList]);

  //need to check *** , there i'll skip 1 useeffext
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("balance", balance);
    }
  }, [balance]);

  return (
    <>
      <div className="container">
        <div className="cardsWrapper">
          <WalletBalance
            money={balance}
            handleClick={() => {
              setIsOpenBalance(true);
            }}
          />
          <Expense
            expense={expense}
            handleClick={() => {
              setIsOpenExpense(true);
            }}
          />
          <PieChart
            data={[
              { name: "Food", value: categorySpends.food },
              { name: "Entertainment", value: categorySpends.entertainment },
              { name: "Travel", value: categorySpends.travel },
            ]}
          />
        </div>

        <div className="transactionsWrapper">
          <TransactionList
            transactions={expenseList}
            editTransactions={setExpenseList}
            title="Recent Transactions"
            balance={balance}
            setBalance={setBalance}
          />
          <BarChart
            data={[
              { name: "Food", value: categorySpends.food },
              { name: "Entertainment", value: categorySpends.entertainment },
              { name: "Travel", value: categorySpends.travel },
            ]}
          />
        </div>
        <Modal isOpen={isOpenBalance} setIsOpen={setIsOpenBalance}>
          <BalanceForm setIsOpen={setIsOpenBalance} setBalance={setBalance} />
        </Modal>

        <Modal isOpen={isOpenExpense} setIsOpen={setIsOpenExpense}>
          <ExpenseForm
            setIsOpen={setIsOpenExpense}
            expenseList={expenseList}
            setExpenseList={setExpenseList}
            setBalance={setBalance}
            balance={balance}
          />
        </Modal>
      </div>
    </>
  );
}

export default App;
