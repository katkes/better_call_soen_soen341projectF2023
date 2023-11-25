import "./styles.css";
import {useState} from "react"

  
  function MortgageCalculator(){ //loanAmount, interestRate, loanLifeTime
    const [loanAmount, setLoanAmount] = useState(0);
    const [interestRate, setInterestRate] = useState(0);
    const [loanLifeTime, setLoanLifeTime] = useState(0);
    const [monthlyPayment, setMonthlyPayment] = useState(0)
     
    function calculate(){
      loanLifeTime = loanLifeTime * 12;
      let block = Math.pow((1+interestRate),loanLifeTime);
      monthlyPayment = loanAmount * (interestRate * block)/(block - 1);
      setMonthlyPayment(monthlyPayment);
    }
    
  
  return (
    <div className="App">
      <h2>loan Amount:</h2>
      <input type="number" id="totalAmount" onChange={(e) => setLoanAmount(e.target.value)}/>
      <h2>interest Rate:</h2>
      <input type="number" onChange={(e) => setInterestRate(e.target.value)}/>
      <h2>Loan Lifetime:</h2>
      <input type="number" onChange={(e) => setLoanLifeTime(e.target.value)}/>
      <button onclick={calculate}></button>
      <h1>Your monthly payment is: ${monthlyPayment}</h1>
    </div>
  );
}

  export default MortgageCalculator;

