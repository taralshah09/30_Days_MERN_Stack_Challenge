import React, { useEffect, useState } from 'react'
import "./IncomePage.css"
import axios from "axios"

const IncomcePage = () => {

  const [incomes, setIncomes] = useState([])

  useEffect(() => {
    const fetchIncomeTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/transaction/income', {
          withCredentials: true, // Ensure session cookie is sent
        });
        console.log(response.data);
        setIncomes(response.data.transactions)
      } catch (error) {
        console.error('Error fetching income transactions:', error);
      }
    };
    fetchIncomeTransactions()
  }, [])

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/transaction/income/delete/${id}`, {
        withCredentials: true,
      });
      console.log(response.data.message);
      setIncomes((prevIncomes) => 
        prevIncomes.filter((income) => income._id !== id) // Update state after deletion
      );
    } catch (error) {
      console.log("Error in deleting the transaction:", error);
    }
  };

  return (
    <div className='income-page-container'>
      <h1 className='page-title'>Income Transactions</h1>
      <div className='income-list'>
        {incomes.length > 0 ? (
          incomes.map((income, index) => (
            <div key={index} className='income-card'>
              <h2 className='income-description'>{income.description}</h2>
              <p className='income-amount'>Amount: ${income.amount}</p>
              <p className='income-date'>Date: {new Date(income.createdAt).toLocaleDateString()}</p>
              <button className='bg-red-500 text-white px-2 py-1 mt-3 rounded-lg text-sm font-medium' onClick={() => handleDelete(income._id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No income transactions available.</p>
        )}
      </div>
    </div>
  )
}

export default IncomcePage
