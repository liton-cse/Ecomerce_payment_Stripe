// pages/ResetPassword.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "./FormInput";
import LogoImage from "./LogoImage";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: trigger email validation / reset logic here
    // Then navigate to password change
    navigate("/change-password");
  };

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
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
