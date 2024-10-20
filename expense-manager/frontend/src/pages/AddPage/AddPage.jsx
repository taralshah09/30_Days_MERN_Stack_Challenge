import React, { useState } from 'react';
import './AddPage.css';

const AddPage = () => {
  const [formData, setFormData] = useState({
    type: 'income',  // default value
    amount: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);  // You can process or save this data as needed.
    // Clear form after submission
    setFormData({ type: 'income', amount: '' });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="type">Type:</label>
        <select 
          name="type" 
          value={formData.type} 
          onChange={handleChange} 
          required
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <label htmlFor="amount">Amount:</label>
        <input 
          type="text" 
          name="amount" 
          value={formData.amount} 
          onChange={handleChange} 
          placeholder="Enter amount" 
          required 
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddPage;
