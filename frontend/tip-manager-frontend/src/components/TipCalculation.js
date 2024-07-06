import React, { useState } from 'react';
import api from './api'; 

function TipCalculator() {
  const [place, setPlace] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [tipPercentage, setTipPercentage] = useState('');
  const [tip, setTip] = useState(null);

  const handleCalculateTip = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/tip/calculate', { place, totalAmount, tipPercentage });
      setTip(response.data.tip);
    } catch (error) {
      console.error('Error calculating tip:', error);
    }
  };

  return (
    <div className="tip-calculator-container">
      <form onSubmit={handleCalculateTip}>
        <div className="form-group">
          <label>Place</label>
          <input type="text" value={place} onChange={(e) => setPlace(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Total Amount</label>
          <input type="number" value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Tip Percentage</label>
          <input type="number" value={tipPercentage} onChange={(e) => setTipPercentage(e.target.value)} required />
        </div>
        <div className="form-group">
          <button type="submit">Calculate Tip</button>
        </div>
      </form>
      {tip !== null && (
        <div className="tip-result">
          <h3>Calculated Tip: {tip}</h3>
        </div>
      )}
    </div>
  );
}

export default TipCalculator;
