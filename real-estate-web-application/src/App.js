import React, { useState} from "react";
import './css/App.css';
import SideBar from './sideBar';
import TopBar from './topBar';
import Content from './Content';
// import PropertySection from "./PropertySection.js";
// import HomePage from "./home";
// import LoginForm from "./LoginForm";
// import RealEstateListing from "./BuyPropertyPage.js";



function App() {
    const [contentText, setContentText] = useState();

    const userID = sessionStorage.getItem('userID');
    const isRegistered = sessionStorage.getItem('isRegistered');
    const userName = sessionStorage.getItem('userName');

    if (userID){
        console.log("Is user resgistered? ", isRegistered)
        console.log("User's name: ", userName)
        console.log("User's id: ", userID);
    }

    else {
        console.log("User has not signed in yet")
    }

  return (
    <div className="App">
      <Content contentText={contentText}/>
      <SideBar/>
      <TopBar setContentText={setContentText}/>
      {/* <PropertySection/> */}
      {/*<PropertySection setContentText={setContentText}/>*/}
      
    </div>
  );
}

export default App;