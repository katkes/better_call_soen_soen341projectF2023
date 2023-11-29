import {useState} from "react";

function SubmitOffer() {

    const [amount, setAmount] = useState(0);
    const [time, setTime] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);

    const [formData, setFormData] = useState({
        userID: sessionStorage.getItem("userID"),
        role: sessionStorage.getItem("role"),
        data1: 0,
        data2: 0
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    if (!(sessionStorage.getItem("isRegistered"))) {

        function onValueChanges(event) {
            event.preventDefault()
            setFinalPrice(amount * time);
        }


        return (
            <div>
                <form action="" method="POST">
                    <label for="offerAmount">amount per installment ($)</label>
                    <input name="offerAmount" type="number" onChange={(e) => setAmount(e.target.value)}></input>

                    <label for="offerTime">number of installments (years)</label>
                    <input name="offerTime" type="number" onChange={(e) => setTime(e.target.value)}></input>

                    <button onClick={onValueChanges}>Calculate total amount</button>
                    <h2>total amount offered: {finalPrice}</h2>
                    <button>Submit the offer</button>
                </form>
            </div>
        );

    } else if (sessionStorage.getItem("role") === "renter") {

        const handleSubmit = async (e) => {
            try {
                const response = await fetch("http://localhost:8000/submit_offer/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                console.log("response of ", response)

            } catch (error) {
                if (error.response && error.response.status) {
                    console.log("Error Status: ", error.response.status);
                } else {
                    console.log("An error occurred:", error);
                }
            }
        };

        return (
            <div>
                <form action="" method="POST" onSubmit={handleSubmit}>
                    <label for="offerAmount">amount per installment ($)</label>
                    <input name="offerAmount" type="number" onChange={(e) => setAmount(e.target.value)}></input>
                    <button>Submit the offer</button>
                </form>
            </div>
        );

    } else {
        function onValueChanges(event) {
            event.preventDefault()
            setFinalPrice(amount * time);
        }

        const handleSubmit = async (e) => {
            try {
                const response = await fetch("http://localhost:8000/submit_offer/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });
            } catch (error) {
                if (error.response && error.response.status) {
                    console.log("Error Status: ", error.response.status);
                } else {
                    console.log("An error occurred:", error);
                }
            }

        };


        return (
            <div>
                <form action="" method="POST" onSubmit={handleSubmit}>
                    <label for="offerAmount">amount per installment ($)</label>
                    <input name="offerAmount" type="number" value={formData.data1}
                           onChange={(e) => setAmount(e.target.value)}></input>

                    <label for="offerTime">number of installments (years)</label>
                    <input name="offerTime" type="number" value={formData.data2}
                           onChange={(e) => setTime(e.target.value)}></input>

                    <button onClick={onValueChanges}>Calculate total amount</button>
                    <h2>total amount offered: {finalPrice}</h2>
                    <button>Submit the offer</button>
                </form>
            </div>
        );

    }

}


export default SubmitOffer;