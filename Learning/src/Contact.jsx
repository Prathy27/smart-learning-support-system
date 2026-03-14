import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <>
      <div className="contact-container">


    


        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-subtitle">
          Any questions or remarks? Just write us a message!
        </p>

        {/* FORM */}
        <div className="contact-form">
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter a valid email address" />
          </div>

          <div className="input-group">
            <label>Name</label>
            <input type="text" placeholder="Enter your Name" />
          </div>

          <button className="submit-btn">SUBMIT</button>
        </div>
      </div>

      {/* BOTTOM INFO SECTION */}
      <div className="info-section">
        <div className="info-box">
          <div className="icon-circle">🏃</div>
          <p className="info-title">ENQUIRIES</p>
          <p className="info-text"> support@smartlearning.com</p>
        </div>

        <div className="info-box">
          <div className="icon-circle">📞</div>
          <p className="info-title">PHONE (LANDLINE)</p>
          <p className="info-text">+91 98765 43210</p>
        </div>

        <div className="info-box">
          <div className="icon-circle">📍</div>
          <p className="info-title">OUR OFFICE LOCATION</p>
          <p className="info-text">
            Smart Learning Academy <br />
            Hyderabad, India
          </p>
        </div>
      </div>
    </>
  );
};

export default Contact;
