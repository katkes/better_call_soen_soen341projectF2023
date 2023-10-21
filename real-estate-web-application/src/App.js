import React, { useState } from "react";
import './App.css';
import SideBar from './sideBar';
import TopBar from './topBar';
import Content from './Content';

function App() {
  const [contentText, setContentText] = useState("Initial content");

  return (
    <div className="App">
      <Content contentText={contentText} />
      <SideBar />
      <TopBar setContentText={setContentText} />
    </div>
  );
}

export default App;