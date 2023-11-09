import "./css/ProfileButton.css";

function ProfileButton({username}){

    return (
        
    <div className="profileButton">
      <button style={{ fontSize: '24px' }}>
        Button <i className='fas fa-user-circle'></i>
      </button>
    </div>
        
    );
}

export default ProfileButton;