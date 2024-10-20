import React, { useContext, useState } from 'react';
import './AddPage.css';
import axios from 'axios';
import UserContext from '../../context/userAuth';

const AddPage = () => {
  const { user } = useContext(UserContext);
  const [mode, setMode] = useState('income');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState("");
  const [createdBy] = useState(user?._id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const transactionData = { mode : mode, amount: amount,description: description, createdBy :createdBy };
      console.log(transactionData)

      const response = await axios.post(
        'http://localhost:5000/transaction/add',
        transactionData,
        { withCredentials: true }
      );
      if (!response.data) {
        alert('Unable to add the transaction');
        return;
      }
      console.log(response.data);
      alert("Transaction added successfully!");
      setAmount(''); // Clear amount field after submission
      setDescription(''); // Clear amount field after submission
    } 
    catch (error) {
      console.error('Error adding transaction:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="type" className="text-2xl font-bold text-green-500">
          Type:
        </label>
        <select
          name="type"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          required
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <label htmlFor="amount" className="text-2xl font-bold text-green-500">
          Amount:
        </label>
        <input
          type="number"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          required
        />
        <label htmlFor="description" className="text-2xl font-bold text-green-500">
          Description:
        </label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddPage;
