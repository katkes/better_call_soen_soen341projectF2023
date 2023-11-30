import SingularCard from "./singularCard.js";
import PropertySection from "./PropertySection";
import React, {useState, useEffect} from "react";

function AccountPage({phoneNumber, username, email, favoriteProperties, setContentText}) {
    phoneNumber = sessionStorage.getItem("phoneNumber");
    username = sessionStorage.getItem("userName");
    email = sessionStorage.getItem("emailAddress");

    const [brokerProps, setBrokerProps] = useState(null);

    const [formData, setFormData] = useState({
        brokerID: sessionStorage.getItem("userID"),
    });

    const getBrokerProps = async () => {
        try {
            const response = await fetch("http://localhost:8000/broker_property_listings/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const answer = await response.json();
            localStorage.setItem('brokerProps', JSON.stringify(answer));
            setBrokerProps(answer);
        } catch (error) {
            console.log("An error occurred:", error);
        }
    };


    const [offers, setOffers] = useState([]);
    const getOffers = async (e) => {
        try {
            const userID = sessionStorage.getItem("userID");
            const response = await fetch(`http://localhost:8000/offer_list/${userID}`, {
                method: "POST",
                // headers: {
                //     "Content-Type": "application/json",
                // },
                // body: JSON.stringify(brokerUserID),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // const answer = await response.json();
            // console.log(JSON.stringify(answer))
            const {offers_data} = await response.json();
            setOffers(offers_data || []);
            // localStorage.setItem('brokerProps', JSON.stringify(answer));

        } catch (error) {
            console.log("An error occurred:", error);
        }
    }


    useEffect(() => {
        const userRole = sessionStorage.getItem("role");
        if (userRole === "broker") {
            getBrokerProps();
            getOffers();
        }
    }, []);

    if (sessionStorage.getItem("role") === "broker") {
        if (brokerProps === null) {
            return <div>Loading...</div>;
        }

        const handleAccept = async (offerId) => {
  try {
    const response = await fetch(`http://localhost:8000/accept_offer/${offerId}/`, {
      method: 'POST',
      // Optionally add headers or body if needed
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log(`Offer ${offerId} accepted`);
    // Optionally, you can update your UI or perform additional actions upon successful acceptance
  } catch (error) {
    console.error('Error accepting offer:', error);
  }
};

const handleReject = async (offerId) => {
  try {
    const response = await fetch(`http://localhost:8000/reject_offer/${offerId}/`, {
      method: 'POST',
      // Optionally add headers or body if needed
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log(`Offer ${offerId} rejected`);
    // Optionally, you can update your UI or perform additional actions upon successful rejection
  } catch (error) {
    console.error('Error rejecting offer:', error);
  }
};


        return (
            <div className="accountPage">
                <h3>{username}</h3>
                <h3>{email}</h3>
                <h3>{phoneNumber}</h3>
                <h3>My Listings</h3>
                <PropertySection setContentText={setContentText} filteredProperties={brokerProps}/>
                <h3>My Offers</h3>
                <div className="offers">
                    {offers.length > 0 ? (
                        offers.map((offer, index) => (
                            <div key={index}>
                                <p>Offer ID: {offer.offer_id}</p>
                                <p>Amount: {offer.amount}</p>
                                <p>Property ID: {offer.property_id}</p>
                                <button onClick={() => handleAccept(offer.offer_id)}>Accept</button>
            <button onClick={() => handleReject(offer.offer_id)}>Reject</button>
                                {/* You can display other offer details here */}
                            </div>
                        ))
                    ) : (
                        <p>No offers available.</p>
                    )}
                </div>
                <div className="favoriteProperties">
                    <h3>Favorites</h3>
                    <SingularCard name="Minecraft House" price="your soul" country="nether" rating="5"
                                  setContentText={setContentText}/>
                    <SingularCard name="Minecraft House" price="your soul" country="nether" rating="5"
                                  setContentText={setContentText}/>
                    {/* More cards */}
                </div>
            </div>
        );
    } else {
        return (
            <div className="accountPage">
                <h3>{username}</h3>
                <h3>{email}</h3>
                <h3>{phoneNumber}</h3>
                <div className="favoriteProperties">
                    <h3>Favorites</h3>
                    <SingularCard name="Minecraft House" price="your soul" country="nether" rating="5"
                                  setContentText={setContentText}/>
                    <SingularCard name="Minecraft House" price="your soul" country="nether" rating="5"
                                  setContentText={setContentText}/>
                    {/* More cards */}
                </div>
            </div>
        );
    }
}

export default AccountPage;
