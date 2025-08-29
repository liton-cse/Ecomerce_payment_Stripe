import type { ReactNode } from "react";
// Type Definitions
export interface CompanyInfo {
  name: string;
  tagline: string;
  description: string;
  logo: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  hours: string;
}

export interface LinkItem {
  name: string;
  href: string;
}

export interface SocialMedia {
  name: string;
  icon: string;
  href: string;
  color: string;
}

export interface Feature {
  icon: string;
  title: string;
  subtitle: string;
}

export interface AnimationConfig {
  floatingIcons: string[];
  delays: {
    sections: number[];
    social: number[];
  };
}

export interface FooterLinks {
  quick: string[];
  categories: string[];
  legal: LinkItem[];
}

export interface FooterConfig {
  company: CompanyInfo;
  contact: ContactInfo;
  links: FooterLinks;
  social: SocialMedia[];
  payments: string[];
  features: Feature[];
  animations: AnimationConfig;
}

export interface LinkClickData {
  name: string;
  index: number;
  href?: string;
}

export interface FooterProps {
  config?: FooterConfig;
  onNewsletterSubmit?: (email: string) => void | Promise<void>;
  onLinkClick?: (
    linkType: "quick" | "category" | "legal" | "social",
    linkData: LinkClickData
  ) => void;
  className?: string;
  theme?: "default" | "dark" | "light";
  showNewsletter?: boolean;
  showSocialMedia?: boolean;
  showPaymentMethods?: boolean;
  showFeatures?: boolean;
  [key: string]: any;
}

// Animation Component Props
export interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number | undefined;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export interface SectionHeaderProps {
  title: string;
  isHovered: boolean;
}

export interface NavigationLinkProps {
  href?: string;
  children: ReactNode;
  onClick?: () => void;
}

export interface ContactItemProps {
  icon: React.ComponentType<any>;
  children: ReactNode;
}

export interface SocialIconProps {
  social: SocialMedia;
  delay?: number;
  onClick?: () => void;
}

export interface PaymentIconProps {
  method: string;
  index: number;
}

export interface FeatureCardProps {
  feature: Feature;
}

export interface NewsletterFormProps {
  email: string;
  setEmail: (email: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
}

export interface FloatingBackgroundProps {
  icons: string[];
}
