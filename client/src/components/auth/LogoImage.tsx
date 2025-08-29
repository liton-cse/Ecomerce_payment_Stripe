// components/LogoImage.tsx
const LogoImage = () => {
  return (
    <div className="flex justify-center mb-6 sm:mb-4 md:mb-2 lg:mb-1">
      <img
        src="/login-logo.jpg"
        alt="Logo"
        className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 object-contain"
      />
    </div>
  );
};

export default LogoImage;
