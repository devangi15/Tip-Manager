import React, { useState } from 'react';
import api from './api'; 

const TipsRetrieval = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [tips, setTips] = useState([]);
  const [message, setMessage] = useState('');

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      setMessage('Please select both start and end dates.');
      return;
    }
    try {
      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);
      console.log("formattedStartDate--->", formattedStartDate);
      console.log("formattedEndDate--->", formattedEndDate);
      
      const response = await api.get('/tip', { 
        params: {
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        },
      });
      setTips(response.data);
      setMessage('Tips retrieved successfully!');
    } catch (error) {
      setMessage(`Error: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  return (
    <div className="tips-retrieval-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Retrieve Tips</button>
        </div>
      </form>
      <p>{message}</p>
      <ul>
        {tips.map((tip, index) => (
          <li key={index}>
            Place: {tip.place}, Total Amount: ${tip.totalAmount}, Tip Amount: ${tip.tipAmount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TipsRetrieval;
