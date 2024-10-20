import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Bar } from 'react-chartjs-2'; // Import Bar chart from react-chartjs-2
import UserContext from '../../context/userAuth';
import './HomePage.css';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HomePage = () => {
  const { user } = useContext(UserContext);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchIncomeTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/transaction/income', {
          withCredentials: true,
        });
        setIncomes(response.data.transactions);
      } catch (error) {
        console.error('Error fetching income transactions:', error);
      }
    };

    const fetchExpenseTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/transaction/expense', {
          withCredentials: true,
        });
        setExpenses(response.data.transactions);
      } catch (error) {
        console.error('Error fetching expense transactions:', error);
      }
    };

    fetchIncomeTransactions();
    fetchExpenseTransactions();
  }, []);

  const totalIncome = incomes.reduce((accumulator, income) => {
    return accumulator + parseFloat(income.amount);
  }, 0);

  const totalExpense = expenses.reduce((accumulator, expense) => {
    return accumulator + parseFloat(expense.amount);
  }, 0);

  const totalBalance = totalIncome - totalExpense;

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/logout", {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        navigate("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  // Prepare data for the bar chart
  const incomeLabels = incomes.map((income) => income.description); // assuming income has description
  const incomeAmounts = incomes.map((income) => parseFloat(income.amount));

  const expenseLabels = expenses.map((expense) => expense.description); // assuming expense has description
  const expenseAmounts = expenses.map((expense) => parseFloat(expense.amount));

  const incomeChartData = {
    labels: incomeLabels,
    datasets: [
      {
        label: 'Income',
        data: incomeAmounts,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const expenseChartData = {
    labels: expenseLabels,
    datasets: [
      {
        label: 'Expense',
        data: expenseAmounts,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Income and Expense Bar Charts',
      },
    },
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Welcome, {user.name}!</h2>
      <p className="text-lg mt-2">Email: {user.email}</p>

      <div className="dashboard mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-green-500 text-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold">Total Income</h3>
          <p className="text-2xl">₹{totalIncome.toFixed(2)}</p>
        </div>
        <div className="bg-red-500 text-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold">Total Expense</h3>
          <p className="text-2xl">₹{totalExpense.toFixed(2)}</p>
        </div>
        <div className="bg-blue-500 text-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold">Total Balance</h3>
          <p className="text-2xl">₹{totalBalance.toFixed(2)}</p>
        </div>
      </div>

      <div className="charts mt-6">
        <h3 className="text-xl font-semibold">Income Transactions</h3>
        <Bar data={incomeChartData} options={options} />

        <h3 className="text-xl font-semibold mt-6">Expense Transactions</h3>
        <Bar data={expenseChartData} options={options} />
      </div>
    </div>
  );
};

export default HomePage;
