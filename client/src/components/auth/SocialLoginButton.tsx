import React from "react";

interface SocialLoginButtonProps {
  provider: "google" | "facebook";
  onClick?: () => void;
}

const providerConfig = {
  google: {
    color: "bg-white hover:bg-gray-100 border",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        className="w-6 h-6"
      >
        <path
          fill="#4285F4"
          d="M24 9.5c3.9 0 7.1 1.6 9.3 3.1l6.9-6.9C36.6 2.7 30.7 0 24 0 14.7 0 6.6 5.4 2.5 13.3l8.1 6.3C12.5 13 17.8 9.5 24 9.5z"
        />
        <path
          fill="#34A853"
          d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9.1h12.4c-.5 2.7-2 5-4.1 6.6l6.3 4.9c3.7-3.4 7.5-9 7.5-16.1z"
        />
        <path
          fill="#FBBC05"
          d="M10.6 28.6c-1-2.7-1.6-5.7-1.6-8.6s.6-5.9 1.6-8.6l-8.1-6.3C.9 9.6 0 13.6 0 18s.9 8.4 2.5 12.3l8.1-6.3z"
        />
        <path
          fill="#EA4335"
          d="M24 48c6.5 0 12-2.1 16-5.7l-6.3-4.9c-2.1 1.4-4.8 2.3-9.7 2.3-6.2 0-11.5-4.2-13.4-9.9l-8.1 6.3C6.6 42.6 14.7 48 24 48z"
        />
      </svg>
    ),
    authUrl: `${import.meta.env.VITE_API_BASE_URL}/auth/google`,
  },
  facebook: {
    color: "bg-white hover:bg-gray-100 border",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        className="w-6 h-6"
      >
        <path
          fill="#1877F2"
          d="M24 0C10.7 0 0 10.7 0 24c0 12 8.8 21.9 20.3 23.7V31h-6.1v-7h6.1v-5.3c0-6 3.6-9.3 9-9.3 2.6 0 4.8.2 5.5.3v6.4h-3.8c-3 0-3.6 1.4-3.6 3.5V24h7.1l-1.1 7h-6v16.7C39.2 45.9 48 36 48 24 48 10.7 37.3 0 24 0z"
        />
        <path
          fill="#fff"
          d="M33.1 31l1.1-7h-7.1v-4.9c0-2.1.6-3.5 3.6-3.5h3.8v-6.4c-.7-.1-2.9-.3-5.5-.3-5.4 0-9 3.3-9 9.3V24h-6.1v7h6.1v16.7c1.2.2 2.5.3 3.8.3 1.3 0 2.6-.1 3.8-.3V31h6z"
        />
      </svg>
    ),
    authUrl: `${import.meta.env.VITE_API_BASE_URL}/auth/facebook`,
  },
};

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  provider,
  onClick,
}) => {
  const { color, icon, authUrl } = providerConfig[provider];

  const handleLogin = () => {
    if (onClick) onClick();
    window.location.href = authUrl; // redirect to backend OAuth
  };

  return (
    <button
      onClick={handleLogin}
      className={`flex items-center justify-center p-2 rounded-full w-10 h-10 ${color}`}
    >
      {icon}
    </button>
  );
};

export default SocialLoginButton;
