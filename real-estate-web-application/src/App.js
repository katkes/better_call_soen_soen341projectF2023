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
      <SideBar setContentText={setContentText}/>
      <TopBar setContentText={setContentText}/>
      {/* <PropertySection/> */}
      {/*<PropertySection setContentText={setContentText}/>*/}
      <p className="p1">Find your perfect home</p>
      <p className="p2">Discover your ideal home with our real estate listings, featuring a diverse range of properties tailored to your lifestyle. 
        Find the perfect balance of comfort and style as you explore your dream living spaces on our user-friendly website.</p>
    </div>
  );
}

export default App;