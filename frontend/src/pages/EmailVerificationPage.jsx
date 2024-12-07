import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(59);

  const navigate = useNavigate();
  const { verifyEmail, isLoading, error, sendOTP } = useAuthStore();

  const inputRefs = useRef([]);
  const handleChange = (index, value) => {
    const newCode = [...code];

    // Handle pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      // Focus on the last non-empty input or the first empty one
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      // Move focus to the next input field if value is entered
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    try {
      await verifyEmail(verificationCode);
      navigate("/");
      toast.success("Email verified successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      await sendOTP();
      toast.success("OTP sent successfully, check your email");
      setSeconds(59);
      setMinutes(1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  useEffect(() => {
    const interval = setInterval(() => {
      //decrease seconds
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      //when second reach 0 decrease minutes
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          //reset seconds to 59 and decrease minute by 1
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);
  return (
    <div className="container">
      <div className="p-8 w-full max-w-md">
        <h2 className="form-title">Verify Your Email</h2>
        <p className="text-center text-gray-300 mb-6">
          Enter the 6-digit code sent to your email address.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between">
            {code.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={6}
                value={digit}
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-green-500 focus:outline-none"
              />
            ))}
          </div>
          {error && <p className="text-red-500 mt-4 font-semibold">{error}</p>}
          <button
            type="submit"
            className="btn"
            disabled={isLoading || code.some((digit) => !digit)}
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </button>
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-300">
              Time Remaining:{" "}
              <span className="font-medium">
                {minutes < 10 ? `0${minutes}` : minutes}:
                {seconds < 10 ? `0${seconds}` : seconds}
              </span>
            </p>
            <button
              disabled={seconds > 0 || minutes > 0}
              type="button"
              onClick={handleSendOtp}
              className={
                seconds > 0 || minutes > 0
                  ? "text-gray-300 cursor-wait"
                  : "text-green-500 underline cursor-pointer"
              }
            >
              Resend OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
