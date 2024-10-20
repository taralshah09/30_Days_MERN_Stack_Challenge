import React, { useEffect, useState } from 'react'
import "./AllPage.css"
import axios from "axios"

const AllPage = () => {

  const [transactions, setTransaction] = useState([])

  useEffect(() => {
    const fetchExpenseTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/transaction/all', {
          withCredentials: true, // Ensure session cookie is sent
        });
        console.log(response.data);
        setTransaction(response.data.transactions)
      } catch (error) {
        console.error('Error fetching expense transactions:', error);
      }
    };
    fetchExpenseTransactions()
  }, [])

  return (
    <div className="all-page-container">
      <h1 className="page-title">All Transactions</h1>
      {transactions.map((transaction) => (
        <div
          key={transaction._id} // Assuming transactions have an _id
          className={`transaction-item ${transaction.mode === 'income' ? 'income' : 'expense'}`}
        >
          <h2 className="transaction-description">{transaction.description}</h2>
          <p className="amount">${transaction.amount}</p>
          <p className="transaction-date">{new Date(transaction.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  )
}

export default AllPage