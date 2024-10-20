import React, { useEffect, useState } from 'react'
import "./ExpensePage.css"
import axios from "axios"

const ExpensePage = () => {

  const [expenses, setExpenses] = useState([])

  useEffect(() => {
    const fetchExpenseTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/transaction/expense', {
          withCredentials: true, // Ensure session cookie is sent
        });
        console.log(response.data);
        setExpenses(response.data.transactions)
      } catch (error) {
        console.error('Error fetching expense transactions:', error);
      }
    };
    fetchExpenseTransactions()
  }, [])

  return (
    <div className='expense-page-container'>
      <h1 className='page-title'>Expense Transactions</h1>
      <div className='expense-list'>
        {expenses.length > 0 ? (
          expenses.map((expense, index) => (
            <div key={index} className='expense-card'>
              <h2 className='expense-description'>{expense.description}</h2>
              <p className='expense-amount'>Amount: ${expense.amount}</p>
              <p className='expense-date'>Date: {new Date(expense.createdAt).toLocaleDateString()}</p>
              <button className='bg-red-500 text-white px-2 py-1 mt-3 rounded-lg text-sm font-medium'>Delete</button>
            </div>
          ))
        ) : (
          <p>No income transactions available.</p>
        )}
      </div>
    </div>
  )
}

export default ExpensePage