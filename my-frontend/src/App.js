import './App.css';
import Home from "./components/Home/Home"
import SignUp from "./components/SignUp/SignUp"
import Login from "./components/Login/Login"
import Chat from "./components/Chat/Chat"
import React from 'react'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
function App() {
  return (
    <React.Fragment>
      <Router>
      <div className="App-header">

      <Routes>
        <Route path="*" element={<Home/>}/>
        <Route path="/SignUp" element={<SignUp/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Chat" element={<Chat/>}/>


      </Routes>
      </div>
      </Router>
    </React.Fragment>
   
  );
}

export default App;
