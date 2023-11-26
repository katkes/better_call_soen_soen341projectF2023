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
    if(monthlyPayment >9999999999){
      setMonthlyPayment("Please enter valid numbers")
    }
  }

  return (
    <div className="App">
      <h2>Loan Amount:</h2>
      <input
        type="number"
        id="totalAmount"
        onChange={(e) => setLoanAmount(parseFloat(e.target.value))}
      />
      <h2>Interest Rate:</h2>
      <input
        type="number"
        onChange={(e) => setInterestRate(parseFloat(e.target.value))}
      />
      <h2>Loan Lifetime:</h2>
      <input
        type="number"
        onChange={(e) => setLoanLifeTime(parseFloat(e.target.value) * 12)}
      />
      <button onClick={calculate}>Calculate</button>
      <h1>Your monthly payment is: ${monthlyPayment}</h1>
    </div>
  );
}

export default MortgageCalculator;