import React, { useState } from "react";
import OTP from "./OTP";

const PhoneLogin = () => {
  const [phone, setPhone] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const regex = /^[0-9]{10}$/;
    if (!regex.test(phone)) {
      alert("Please enter a valid phone number");
      return;
    } else {
      setShowOtp(true);
    }
  };

  const handleOTPSubmit = (otp) => {
    console.log("OTP submitted:", otp);
    setShowOtp(false);
    setPhone("");
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  return (
    <div>
      {!showOtp ? (
        <>
          <form onSubmit={handleSubmit}>
            <input
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="phone-input"
            />
            <button type="submit" className="submit-btn">
              Send OTP
            </button>
          </form>
          {showMessage && <h3>OTP submitted.</h3>}
        </>
      ) : (
        <div>
          <h2>Enter the OTP sent on {phone}</h2>
          <OTP otpLength={6} onOTPSubmit={handleOTPSubmit} />
        </div>
      )}
    </div>
  );
};

export default PhoneLogin;
