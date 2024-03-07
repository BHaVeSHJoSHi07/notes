import React from "react";
import Note from "./Note";

const Home = (props) => {
  return (
    <>
      <div className="container mt-3">
        <Note showAlert={props.showAlert}/>
      </div>
    </>
  );
};
export default Home;
