import SingularCard from "./singularCard.js";

function AccountPage({phoneNumber, username, email, favoriteProperties, setContentText}){
//phone number username email, favorite properties


    return(
        <div className="accountPage">
            <h3>{username}</h3>
            <h3>{email}</h3>
            <h3>{phoneNumber}</h3>



        <div className="favoriteProperties">
        <h3>Favorites</h3>
        


        <SingularCard name="Minecraft House" price="your soul" country="nether" rating="5" setContentText={setContentText}/>
        <SingularCard name="Minecraft House" price="your soul" country="nether" rating="5" setContentText={setContentText}/>
        </div>
        </div>
    );
}


export default AccountPage;


