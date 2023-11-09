import "./css/ProfileButton.css";
import AccountPage from "./accountPage.js";

function ProfileButton({username, setContentText}){

  const handleButtonClick = () => {
    setContentText(<AccountPage phoneNumber="514-999-9999" username="username" email="email@emailaddress.com"/>);
  };
    return (
        
    <div onClick='' className="profileButton">
      {username}
     
    </div>
    );
}

export default ProfileButton;