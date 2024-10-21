import React, { useState } from "react";
import "./Register.css";
import img from "../../../assets/react.svg";
import animate from "../../../assets/video/animate.mp4";
const Register = () => {
  const [loading, setLoading] = useState(false);

  const handleLoading = (e) => {
    e.preventDefault();
    setLoading(!loading);
  };
  return (
    <div className="registration">
      <h1>Welcome to hearMe</h1>
      <div className="registration-main">
        <form className="registration-form">
          <input type="text" placeholder="Name" />
          <span></span>
          <input type="email" placeholder="Email" />
          <span></span>
          <input type="password" placeholder="password" />
          <input type="password" placeholder="Confirm Password" />

          <div className="submit">
            <button onClick={(e) => handleLoading(e)}>Sign Up</button>
            <span className="loader"></span>
          </div>
        </form>
        <div className="video-overly">
          {/* <video autoPlay loop muted>
            <source src={animate} type="video/mp4" />
            Your browser does not support the video tag.
          </video> */}
        </div>
      </div>
    </div>
  );
};

export default Register;
