// src/components/AgeCalculator.jsx
import React, { useState } from 'react';
import '../style.css';

const AgeCalculator = () => {
  const [dob, setDob] = useState('');
  const [result, setResult] = useState('');

  const calculateAge = (e) => {
    e.preventDefault();

    if (!dob) {
      alert('Please enter your date of birth in the format YYYY-MM-DD.');
      return;
    }

    const { age, month, day } = getAge(dob);

    setResult(
      `You are ${age} ${age !== 1 ? 'years' : 'year'}, ${month} ${
        month !== 1 ? 'months' : 'month'
      }, and ${day} ${day !== 1 ? 'days' : 'day'} old.`
    );
  };

  const getAge = (dobValue) => {
    const currentDate = new Date();
    const dobDate = new Date(dobValue);

    let age = currentDate.getFullYear() - dobDate.getFullYear();
    let month = currentDate.getMonth() - dobDate.getMonth();
    let day = currentDate.getDate() - dobDate.getDate();

    if (month < 0 || (month === 0 && day < 0)) {
      age--;
      month += 12;
    }

    if (day < 0) {
      month--;
      const daysInPreviousMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0
      ).getDate();
      day += daysInPreviousMonth;
    }

    if (month < 0) {
      month += 12;
    }

    return { age, month, day };
  };

  return (
    <div className="outContainer">
      <div className="container">
        <h1>Age Calculator</h1>
        <form onSubmit={calculateAge}>
          <label htmlFor="dob">Enter your date of birth: </label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          <input type="submit" className="btn2" value="Calculate Age" />
          {/* <div id="result">{result}</div> */}
          <div id="result">
            {result || (
              <span style={{ visibility: 'hidden' }}>
                You are 00 years, 00 months, and 00 days old.
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgeCalculator;
