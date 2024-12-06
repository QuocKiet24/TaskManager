import { useEffect, useRef, useState } from "react";

const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const isLoading = false;
  const inputRefs = useRef([]);
  const handleChange = (index, value) => {
    const newCode = [...code];

    // handle paste content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);
      //focus on the last non-empty input or the first empty one
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    console.log(`verificationCode: ${verificationCode}`);
  };

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);
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
          <button
            type="submit"
            className="btn"
            disabled={isLoading || code.some((digit) => !digit)}
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
