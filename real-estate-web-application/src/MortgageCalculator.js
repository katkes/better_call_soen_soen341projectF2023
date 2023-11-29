import { useState } from "react";

function MortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [loanLifeTime, setLoanLifeTime] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  function calculate() {
    // Convert interest rate to monthly decimal
    const monthlyInterestRate = interestRate / 1200;

    // Calculate monthly payment using the formula
    const block = Math.pow(1 + monthlyInterestRate, loanLifeTime);
    const calculatedMonthlyPayment =
      (loanAmount * monthlyInterestRate * block) / (block - 1);

    // Set the monthly payment state, rounded to 2 decimal places
    setMonthlyPayment(Math.round(calculatedMonthlyPayment * 100) / 100);
    if(monthlyPayment >9999){
      setMonthlyPayment("Please enter valid numbers")
    }
  }

  return (
    <div className="App">
      <br></br>
      <hr></hr>
      <h2>Calculate your monthly payment</h2>
      <p>
        Enter the <i>loan amount</i>, <i>interest rate</i>, and{' '}
        <i>loan lifetime</i>.
      </p>
      <div className="input-container">
        <div className="input-group">
          <label htmlFor="loan-amount">Loan Amount</label>
          <input
            type="number"
            id="totalAmount"
            onChange={(e) => setLoanAmount(parseFloat(e.target.value))}
          />
        </div>

        <div className="input-group">
          <label htmlFor="interest">Interest Rate</label>
          <input
            type="number"
            onChange={(e) => setInterestRate(parseFloat(e.target.value))}
          />
        </div>

        <div className="input-group">
          <label htmlFor="years">Loan Lifetime</label>
          <input
            type="number"
            onChange={(e) => setLoanLifeTime(parseFloat(e.target.value) * 12)}
          />
        </div>
      </div>
      <br></br>
      <button className="calculate-button" onClick={calculate}>Calculate</button>
      <h3>Your monthly payment is: ${monthlyPayment}</h3>
    </div>
  );
}

export default MortgageCalculator;