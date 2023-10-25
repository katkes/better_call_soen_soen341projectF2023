import React, { useState } from "react";
import './css/App.css';
import SideBar from './sideBar';
import TopBar from './topBar';
import Content from './Content';
// import PropertySection from "./PropertySection.js";
//import HomePage from "./home";
//import LoginForm from "./LoginForm";
import BuyPropertyPage from "./BuyPropertyPage.js";

function App() {
  const [contentText, setContentText] = useState();/*BuyPropertyPage()*/ 

  return (
    <div className="App">
      <Content contentText={contentText}/>
      <SideBar/>
      <TopBar setContentText={setContentText}/>
      {/* <PropertySection/> */}
      <BuyPropertyPage img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTVIiqTmqNZ2Pu85wNJ6LktY_UuOq5Hewg2A&usqp=CAU"name="Duplex" price="100 000" country="Canada" rating="4.6"/>
    </div>
  );
}

export default App;