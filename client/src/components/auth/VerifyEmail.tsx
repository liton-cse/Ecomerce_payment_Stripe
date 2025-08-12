// pages/ResetPassword.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "./FormInput.js";
import LogoImage from "./LogoImage.js";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/app/store.js";
import { useLocation } from "react-router-dom";
import { verifyOtp } from "../../redux/feature/auth/verifyOptSlice.js";

const VerifyEmail = () => {
  const [otp, setOtp] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const { loading, error, success, token } = useSelector(
    (state: RootState) => state.verifyEmailAuth
  );
  const dispatch = useDispatch<any>();
  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(verifyOtp({ email, oneTimeCode: Number(otp) }));
  };

  useEffect(() => {
    if (success && token) {
      navigate("/reset-password", { state: { token } });
    }
  }, [success, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-8 sm:py-12">
      <div className="w-full max-w-xs sm:max-w-md md:max-w-lg p-6 sm:p-8 bg-white rounded-lg shadow-lg">
        {/* Logo */}
        <LogoImage />

        <form onSubmit={handleReset}>
          <FormInput
            label="OTP"
            id="opt"
            type="number"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter your otp"
            required
          />

          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? "Submit..." : "Submit"}
          </button>
          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
