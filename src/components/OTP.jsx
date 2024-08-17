import React, { useEffect, useRef, useState } from "react";

const OTP = ({ otpLength = 6, onOTPSubmit }) => {
  const [otp, setOtp] = useState(new Array(otpLength).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // call onOTPSubmit
    const finalOtp = newOtp.join("");
    if (finalOtp.length === otpLength) {
      onOTPSubmit(finalOtp);
    }

    // focus on next input
    if (value && index < otpLength - 1) {
      inputRefs.current[index + 1].focus();
    }
  };
  // handle click
  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);
  };

  // handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  return (
    <div>
      {otp.map((value, index) => (
        <input
          key={index}
          type="text"
          value={value}
          ref={(ref) => (inputRefs.current[index] = ref)}
          onChange={(e) => handleChange(e, index)}
          onClick={() => handleClick(index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          maxLength={1}
          className="otp-input"
        />
      ))}
    </div>
  );
};

export default OTP;
