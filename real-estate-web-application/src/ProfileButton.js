import "./css/ProfileButton.css";
import AccountPage from "./AccountPage.js";

function ProfileButton({username, setContentText}){

  const handleButtonClick = () => {
    setContentText(<AccountPage phoneNumber="514-999-9999" username="username" email="email@emailaddress.com" setContentText={setContentText}/>);
  };
    return (
        
    <div onClick={handleButtonClick} className="profileButton">
      {username}
     
    </div>
    );
}

export default ProfileButton;