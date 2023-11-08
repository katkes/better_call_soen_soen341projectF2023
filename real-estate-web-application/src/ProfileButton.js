import "./css/ProfileButton.css";

function ProfileButton({username}){

    return (
        
        <button className="profileButton">{username}</button>
        
    );
}

export default ProfileButton;