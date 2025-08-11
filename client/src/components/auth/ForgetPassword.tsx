// pages/ResetPassword.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "./FormInput";
import LogoImage from "./LogoImage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/app/store";
import { forgetPassword } from "../../redux/feature/auth/forgetPasswordSlice";

const ResetPassword = () => {
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();
  const { loading, error, success } = useSelector(
    (state: RootState) => state.forgetAuth
  );
  const dispatch = useDispatch<any>();

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(forgetPassword({ email }));
  };

  useEffect(() => {
    if (success) {
      navigate("/verify-otp", { state: { email } });
    }
  }, [success, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-8 sm:py-12">
      <div className="w-full max-w-xs sm:max-w-md md:max-w-lg p-6 sm:p-8 bg-white rounded-lg shadow-lg">
        {/* Logo */}
        <LogoImage />

        <form onSubmit={handleReset}>
          <FormInput
            label="Email"
            id="reset-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
            required
          />

          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? "Sending..." : "Submit"}
          </button>
          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
