import {useState} from "react";

function SubmitOffer(){

    const [amount, setAmount] = useState(0);
    const [time, setTime] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);

    function onValueChanges(e){
        setFinalPrice(amount * time); 
    }

    return (
        <div>
            <form action="" method="POST">
                <label for="offerAmount">amount per installment ($)</label>
                <input name="offerAmount" type="number" onChange={(e) => setAmount(e.target.value)}></input>

                <label for="offerTime">number of installments (years)</label>
                <input name="offerTime" type="number" onChange={(e) => setTime(e.target.value)} ></input>

                <button onClick={onValueChanges}>Calculate total amount</button>
                <h2>total amount offered: {finalPrice}</h2>
                <button>Submit the offer</button>
            </form>
        </div>
    );
}


export default SubmitOffer;