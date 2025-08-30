import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Clock, ChevronRight, Send } from "lucide-react";
import type {
  AnimatedSectionProps,
  ContactItemProps,
  Feature,
  FeatureCardProps,
  FloatingBackgroundProps,
  FooterConfig,
  FooterProps,
  LinkClickData,
  LinkItem,
  NavigationLinkProps,
  NewsletterFormProps,
  PaymentIconProps,
  SectionHeaderProps,
  SocialIconProps,
  SocialMedia,
} from "./footer.type.js";
import { DEFAULT_FOOTER_CONFIG } from "./footerDefoultconfig.js";
import LocationTracker from "../location/locationTrack.js";
// Reusable Components
const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  delay = 0,
  className = "",
  onMouseEnter,
  onMouseLeave,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transform transition-all duration-1000 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      } ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
};

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, isHovered }) => (
  <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 relative">
    {title}
    <div
      className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-500 ${
        isHovered ? "w-16" : "w-0"
      }`}
    ></div>
  </h3>
);

const NavigationLink: React.FC<NavigationLinkProps> = ({
  href = "#",
  children,
  onClick,
}) => (
  <li className="transform transition-all duration-300 hover:translate-x-1 sm:hover:translate-x-2">
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
      }}
      className="text-sm sm:text-base text-gray-300 hover:text-orange-400 transition-colors duration-300 flex items-center group cursor-pointer"
    >
      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="group-hover:translate-x-1 transition-transform duration-300">
        {children}
      </span>
    </a>
  </li>
);

const ContactItem: React.FC<ContactItemProps> = ({ icon: Icon, children }) => (
  <div className="flex items-start space-x-3 group">
    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 mt-0.5 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
    <p className="text-sm sm:text-base text-gray-300 group-hover:text-white transition-colors duration-300">
      {children}
    </p>
  </div>
);

const SocialIcon: React.FC<SocialIconProps> = ({ social, delay, onClick }) => (
  <a
    href={social.href}
    onClick={(e) => {
      e.preventDefault();
      onClick?.();
    }}
    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center text-base sm:text-lg transition-all duration-500 transform hover:scale-110 hover:rotate-12 ${social.color} hover:shadow-lg backdrop-blur-sm border border-white/20 cursor-pointer`}
    style={{ transitionDelay: `${delay}ms` }}
    aria-label={social.name}
  >
    {social.icon}
  </a>
);

const PaymentIcon: React.FC<PaymentIconProps> = ({ method, index }) => (
  <div
    className="bg-white rounded px-2 py-1 text-xs font-semibold text-gray-800 transition-all duration-300 transform hover:scale-110 hover:rotate-3 hover:shadow-lg cursor-default"
    style={{
      transitionDelay: `${index * 50}ms`,
      minWidth: "30px",
      textAlign: "center",
    }}
  >
    {method}
  </div>
);

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => (
  <div className="bg-white/5 rounded-lg p-3 sm:p-4 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 text-center">
    <div className="text-xl sm:text-2xl mb-1 sm:mb-2">{feature.icon}</div>
    <h4 className="font-semibold text-orange-400 mb-1 text-sm sm:text-base">
      {feature.title}
    </h4>
    <p className="text-xs sm:text-sm text-gray-400">{feature.subtitle}</p>
  </div>
);

const NewsletterForm: React.FC<NewsletterFormProps> = ({
  email,
  setEmail,
  onSubmit,
  isLoading = false,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/10">
      <h4 className="text-base sm:text-lg font-semibold mb-2 text-orange-400">
        Stay Updated
      </h4>
      <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">
        Get the latest offers and updates
      </p>

      <div className="space-y-3" onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            placeholder="Enter your email"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 rounded-lg border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
            required
            disabled={isLoading}
          />
          <Mail className="absolute right-3 top-2 sm:top-3 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
        </div>

        <button
          onClick={onSubmit}
          disabled={isLoading || !email.trim()}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 disabled:transform-none disabled:shadow-none flex items-center justify-center space-x-2 text-sm sm:text-base"
        >
          <Send className="w-3 h-3 sm:w-4 sm:h-4" />
          <span>{isLoading ? "Subscribing..." : "Subscribe"}</span>
        </button>
      </div>
    </div>
  );
};

const FloatingBackground: React.FC<FloatingBackgroundProps> = ({ icons }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {icons.map((icon: string, index: number) => (
      <div
        key={index}
        className="absolute text-3xl sm:text-4xl lg:text-6xl opacity-5 animate-bounce"
        style={{
          left: `${10 + index * 15}%`,
          top: `${20 + (index % 3) * 20}%`,
          animationDelay: `${index * 0.5}s`,
          animationDuration: `${4 + (index % 3)}s`,
        }}
      >
        {icon}
      </div>
    ))}
  </div>
);

// Main Footer Component
const FoodEcommerceFooter: React.FC<FooterProps> = ({
  config = DEFAULT_FOOTER_CONFIG,
  onNewsletterSubmit,
  onLinkClick,
  className = "",
  theme = "default",
  showNewsletter = true,
  showSocialMedia = true,
  showPaymentMethods = true,
  showFeatures = true,
  ...props
}) => {
  const [email, setEmail] = useState<string>("");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleNewsletterSubmit = async (): Promise<void> => {
    if (!email.trim()) return;

    setIsSubmitting(true);
    try {
      if (onNewsletterSubmit) {
        await onNewsletterSubmit(email);
      } else {
        // Default behavior
        console.log("Newsletter subscription:", email);
        alert("Thank you for subscribing!");
      }
      setEmail("");
    } catch (error) {
      console.error("Newsletter subscription failed:", error);
      alert("Subscription failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLinkClick = (
    linkType: "quick" | "category" | "legal" | "social",
    linkData: LinkClickData
  ): void => {
    onLinkClick?.(linkType, linkData);
  };

  const themeClasses = {
    default: "bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4",
    dark: "bg-gradient-to-br from-gray-900 via-black to-gray-800 p-4",
    light: "bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 p-4",
  };

  return (
    <div className={`${themeClasses[theme]} ${className}`} {...props}>
      <footer className="relative bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white overflow-hidden">
        {/* Animated Top Border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 animate-pulse"></div>

        {/* Floating Background */}
        <FloatingBackground icons={config.animations.floatingIcons} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {/* Company Info Section */}
            <AnimatedSection delay={config.animations.delays.sections[0]}>
              {/* Logo */}
              <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                <div className="relative">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-xl sm:text-2xl animate-pulse">
                    {config.company.logo}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl blur-lg opacity-30 animate-ping"></div>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                    {config.company.name}
                  </h2>
                  <p className="text-xs text-gray-400">
                    {config.company.tagline}
                  </p>
                </div>
              </div>

              <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 leading-relaxed">
                {config.company.description}
              </p>

              {/* Newsletter Subscription */}
              {showNewsletter && (
                <NewsletterForm
                  email={email}
                  setEmail={setEmail}
                  onSubmit={handleNewsletterSubmit}
                  isLoading={isSubmitting}
                />
              )}
            </AnimatedSection>

            {/* Quick Links */}
            <AnimatedSection
              delay={config.animations.delays.sections[1]}
              onMouseEnter={() => setHoveredSection("quick")}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <SectionHeader
                title="Quick Links"
                isHovered={hoveredSection === "quick"}
              />

              <ul className="space-y-2 sm:space-y-3">
                {config.links.quick.map((link: string, index: number) => (
                  <NavigationLink
                    key={index}
                    onClick={() =>
                      handleLinkClick("quick", { name: link, index })
                    }
                  >
                    {link}
                  </NavigationLink>
                ))}
              </ul>
            </AnimatedSection>

            {/* Categories */}
            <AnimatedSection
              delay={config.animations.delays.sections[2]}
              onMouseEnter={() => setHoveredSection("categories")}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <SectionHeader
                title="Categories"
                isHovered={hoveredSection === "categories"}
              />

              <ul className="space-y-2 sm:space-y-3">
                {config.links.categories.map(
                  (category: string, index: number) => (
                    <NavigationLink
                      key={index}
                      onClick={() =>
                        handleLinkClick("category", { name: category, index })
                      }
                    >
                      {category}
                    </NavigationLink>
                  )
                )}
              </ul>
            </AnimatedSection>

            {/* Contact Info */}
            <AnimatedSection
              delay={config.animations.delays.sections[3]}
              onMouseEnter={() => setHoveredSection("contact")}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <SectionHeader
                title="Contact Info"
                isHovered={hoveredSection === "contact"}
              />

              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <ContactItem icon={MapPin}>
                  {config.contact.address}
                </ContactItem>
                <ContactItem icon={Phone}>{config.contact.phone}</ContactItem>
                <ContactItem icon={Mail}>{config.contact.email}</ContactItem>
                <ContactItem icon={Clock}>{config.contact.hours}</ContactItem>
              </div>

              {/* Social Media Icons */}
              {showSocialMedia && (
                <div className="flex space-x-2 sm:space-x-3 justify-center sm:justify-start">
                  {config.social.map((social: SocialMedia, index: number) => (
                    <SocialIcon
                      key={index}
                      social={social}
                      delay={config.animations.delays.social[index] ?? 0}
                      onClick={() =>
                        handleLinkClick("social", {
                          name: social.name,
                          index,
                          href: social.href,
                        })
                      }
                    />
                  ))}
                </div>
              )}
            </AnimatedSection>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-white/10 pt-6 sm:pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 gap-4">
              {/* Copyright */}
              <div className="text-center lg:text-left order-2 lg:order-1">
                <p className="text-xs sm:text-sm text-gray-400">
                  &copy; 2025 {config.company.name}. All rights reserved. |{" "}
                  {config.links.legal.map((link: LinkItem, index: number) => (
                    <span key={index}>
                      <a
                        href={link.href}
                        className="text-orange-400 hover:text-orange-300 transition-colors duration-300 cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick("legal", {
                            name: link.name,
                            index,
                            href: link.href,
                          });
                        }}
                      >
                        {link.name}
                      </a>
                      {index < config.links.legal.length - 1 && " | "}
                    </span>
                  ))}
                </p>
              </div>

              {/* Payment Methods */}
              {showPaymentMethods && (
                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 order-1 lg:order-2">
                  <span className="text-gray-400 text-xs sm:text-sm">
                    We Accept:
                  </span>
                  <div className="flex flex-wrap justify-center gap-2">
                    {config.payments.map((method: string, index: number) => (
                      <PaymentIcon key={index} method={method} index={index} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Additional Features */}
            {showFeatures && (
              <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {config.features.map((feature: Feature, index: number) => (
                  <FeatureCard key={index} feature={feature} />
                ))}
              </div>
            )}
          </div>
        </div>
        <LocationTracker />
      </footer>
    </div>
  );
};

export default FoodEcommerceFooter;
export type { FooterProps, FooterConfig, LinkClickData };
