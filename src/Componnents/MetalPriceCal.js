import React, { useState } from 'react';
import "./MetalPriceCal.css"


const MetalPriceCal = () => {

  const MetalPrices = {
    gold: 6985,   
    silver: 85,   
    platinum: 3650 
  };

  const [weight, setWeight] = useState('1');
  const [unit, setUnit] = useState('g');
  const [metal, setMetal] = useState('gold');
  const [purity, setPurity] = useState('24');

  const unitConv = {
    g: 1,     
    kg: 1000   
  };

  const purityFactors = {
    '24': 1,
    '22': 0.916,
    '18': 0.750,
    '14': 0.585
  };

  const handleCalculate = () => {

    const grams = parseFloat(weight) * unitConv[unit];
    let price = grams * MetalPrices[metal];
    if (metal === 'gold') {
      price = price * purityFactors[purity];
    }
    return isNaN(price) ? 0 : price;

  };

  return (
    <div className="calculator-card">
      <div className="calculator-header">
        <h2 className="calculator-title">Metals Price Calculator</h2>
      </div>

      <div className="cal-form">
        <label className="form-label"> Select Metal Type</label>
        <select 
          className="form-select"
          value={metal}
          onChange={(e) => setMetal(e.target.value)}
        >
          <option value="gold">Gold</option>
          <option value="silver">Silver</option>
          <option value="platinum">Platinum</option>
        </select>
      </div>

      {metal === 'gold' && (
        <div className="cal-form">
          <label className="form-label">Gold Purity</label>
          <select
            className="form-select"
            value={purity}
            onChange={(e) => setPurity(e.target.value)}
          >
            <option value="24">24K</option>
            <option value="22">22K</option>
            <option value="18">18K</option>
            <option value="14">14K</option>
          </select>
        </div>
      )}

      <div className="cal-form">
        <label className="form-label">Weight</label>
        <div className="weight-input-group">
          <input
            type="number"
            className="weight-input"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            min="0"
            step="0.01"
          />
          <select
            className="unit-select"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          >
            <option value="g">Grams</option>
            <option value="kg">Kilograms</option>
          </select>
        </div>
      </div>

      <div className="result-panel">
        <div className="price-row">
          <div className="current-price">
            <p className="current-price-label">
              Current {metal.charAt(0).toUpperCase() + metal.slice(1)} Price:
            </p>
            <p className="current-price-value">
              ₹{MetalPrices[metal].toLocaleString()} per gram
              {metal === 'gold' && ` (24K)`}
            </p>
          </div>
          <div className="total-value">
            <p className="total-value-label">Total Value:</p>
            <p className="total-value-amount">
              ₹{handleCalculate().toLocaleString(undefined, {maximumFractionDigits: 2})}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetalPriceCal;