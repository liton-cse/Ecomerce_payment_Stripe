// pages/ChangePassword.tsx
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import FormInput from "./FormInput.js";
import { useNavigate } from "react-router-dom";
import LogoImage from "./LogoImage.js";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/app/store.js";
import {
  clearResetPasswordState,
  resetPassword,
} from "../../redux/feature/auth/resetPasswordSlice.js";
import { useLocation } from "react-router-dom";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { success } = useSelector(
    (state: RootState) => state.resetPasswordAuth
  );
  const dispatch = useDispatch<any>();
  const token = location.state?.token;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    dispatch(resetPassword({ newPassword, confirmPassword, token }));
  };

  useEffect(() => {
    if (success) {
      alert("Password reset successful! Please login.");
      dispatch(clearResetPasswordState());
      navigate("/");
    }
  }, [success, navigate, dispatch]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-6 sm:p-8 bg-white rounded-lg shadow-lg">
        {/* Logo */}
        <LogoImage />

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>

            <div className="relative">
              <input
                type={show ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <FormInput
            label="Confirm Password"
            id="confirm-password"
            type={show ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
