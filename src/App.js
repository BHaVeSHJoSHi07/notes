import "./App.css";
import {React, useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  // eslint-disable-next-line no-unused-vars
  const [alert, setAlert] = useState(null)

  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert alert={alert}/>
        <div className="container">
        <Routes>
          <Route path="/" exact element={<Home showAlert = {showAlert}/>} />
          <Route path="/about" exact element={<About />} />
          <Route path="/login" exact element={<Login showAlert = {showAlert}/>} />
          <Route path="/signUp" exact element={<SignUp showAlert = {showAlert}/>} />
        </Routes>
        </div>
       
      </Router>
    </NoteState>
  );
}

export default App;
