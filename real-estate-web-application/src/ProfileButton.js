import "./css/ProfileButton.css";

function ProfileButton({username, setContentText}){

  const handleButtonClick = () => {
   
    setContentText();
  };

    return (
        
    <div onClick='' className="profileButton">
      {username}
     
    </div>
        
    );
}

export default ProfileButton;