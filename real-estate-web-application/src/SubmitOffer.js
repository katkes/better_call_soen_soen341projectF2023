import {useState} from "react";

function SubmitOffer(propID) {

    const [amount, setAmount] = useState(0);
    const [time, setTime] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);

    // const [finalPrice, setFinalPrice] = useState(0);

    const [formData, setFormData] = useState({
        userID: sessionStorage.getItem("userID"),
        username: sessionStorage.getItem("userName"),
        role: sessionStorage.getItem("role"),
        data1: 0,
        data2: 0,
        propID: propID
    });

    // const handleChange = (e) => {
    //     setFormData({
    //         ...formData,
    //         [e.target.name]: e.target.value,
    //     });
    // };

    // const handleChange = (e) => {
    //     if (e.target.name === "offerAmount") {
    //         setAmount(e.target.value);
    //     }
    //     setFormData({
    //         ...formData,
    //         [e.target.name]: e.target.value,
    //     });
    // };

    const handleChange = (e) => {
        if (e.target.name === "offerAmount") {
            setAmount(e.target.value);
        } else if (e.target.name === "offerTime") {
            setTime(e.target.value);
        }
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

        function stopAlert() {
            alert("Please login to submit an offer!")
        }


        return (

            <div>
                <hr></hr>
                <h2>Submit an offer</h2>
                <form action="">
                    <p>Enter the <i>amount per installment</i> and the <i>number of installments</i>.</p>
                    <div className="input-container">
                        <div className="input-group">
                            <label for="offerAmount">Amount per installment ($)</label>
                            <input name="offerAmount" type="number" onChange={(e) => setAmount(e.target.value)}></input>
                        </div>
                        <div className="input-group">
                            <label for="offerTime">Number of installments (in years)</label>
                            <input name="offerTime" type="number" onChange={(e) => setTime(e.target.value)}></input>
                        </div>
                    </div>
                    <br></br>
                    <button className="calculate-button" onClick={onValueChanges}>Calculate total amount</button>
                    <h3>Total amount offered: ${finalPrice}</h3>
                    <button className="calculate-button" onClick={stopAlert}>Submit the offer</button>
                </form>
            </div>
        );

    }

    // else if (sessionStorage.getItem("role") === "renter") {
    //
    //
    //
    //     const handleSubmit = async (e) => {
    //
    //         e.preventDefault();
    //         try {
    //             const response = await fetch("http://localhost:8000/submit_offer/", {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify(formData),
    //             });
    //
    //             console.log("response of ", response)
    //
    //         } catch (error) {
    //             if (error.response && error.response.status) {
    //                 console.log("Error Status: ", error.response.status);
    //             } else {
    //                 console.log("An error occurred:", error);
    //             }
    //         }
    //     };
    //
    //     return (
    //         <div>
    //             <hr></hr>
    //             <h2>Submit an offer</h2>
    //             <form action="" method="POST" onSubmit={handleSubmit}>
    //                 <p>Enter the <i>amount per monthly installment</i>.</p>
    //                 <div className="input-container">
    //                     <div className="input-group">
    //                         <label htmlFor="offerAmount">Amount per monthly installment ($)</label>
    //                         <input name="offerAmount"
    //                                type="number"
    //                                onChange={handleChange}></input>
    //                         {/*<input name="offerAmount" type="number" onChange={(e) => setAmount(e.target.value)}></input>*/}
    //                     </div>
    //                 </div>
    //                 <br></br>
    //                 <button className="calculate-button">Submit the offer</button>
    //             </form>
    //         </div>
    //
    //         // <div>
    //         //     <form action="" method="POST" onSubmit={handleSubmit}>
    //         //         <label for="offerAmount">amount per monthly installment ($)</label>
    //         //         <input name="offerAmount" value={formData.data1} type="number" onChange={(e) => setAmount(e.target.value)}></input>
    //         //         <button>Submit the offer</button>
    //         //     </form>
    //         // </div>
    //     );
    //
    // }

    if (sessionStorage.getItem("role") === "renter") {

        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const response = await fetch("http://localhost:8000/submit_offer/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({...formData, offerAmount: amount}),
                });

                if (response.ok) {
                    alert("Offer submitted successfully!");
                } else {
                    alert("An error occurred while submitting the offer.");
                }

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
                <hr></hr>
                <h2>Submit an offer</h2>
                <form action="" method="POST" onSubmit={handleSubmit}>
                    <p>Enter the <i>amount per monthly installment</i>.</p>
                    <div className="input-container">
                        <div className="input-group">
                            <label htmlFor="offerAmount">Amount per monthly installment ($)</label>
                            <input name="offerAmount"
                                   type="number"
                                   onChange={handleChange}></input>
                        </div>
                    </div>
                    <br></br>
                    <button className="calculate-button">Submit the offer</button>
                </form>
            </div>
        );
    }


    else {
        const onValueChanges = (event) => {
            event.preventDefault();
            setFinalPrice(amount * time);
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const response = await fetch("http://localhost:8000/submit_offer/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({...formData, offerAmount: amount, offerTime: time}),
                });

                if (response.ok) {
                    alert("Offer submitted successfully!");
                } else {
                    alert("An error occurred while submitting the offer.");
                }

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
                <hr></hr>
                <h2>Submit an offer</h2>
                <form action="" method="POST" onSubmit={handleSubmit}>
                    <p>Enter the <i>amount per installment</i> and the <i>number of installments</i>.</p>
                    <div className="input-container">
                        <div className="input-group">
                            <label htmlFor="offerAmount">Amount per installment ($)</label>
                            <input name="offerAmount" type="number" value={amount} onChange={handleChange}></input>
                        </div>
                        <div className="input-group">
                            <label htmlFor="offerTime">Number of installments (in years)</label>
                            <input name="offerTime" type="number" value={time} onChange={handleChange}></input>
                        </div>
                    </div>
                    <br></br>
                    <button className="calculate-button" onClick={onValueChanges}>Calculate total amount</button>
                    <h3>Total amount offered: ${finalPrice}</h3>
                    <button className="calculate-button" type="submit">Submit the offer</button>
                </form>
            </div>
        );

    }

}


export default SubmitOffer;