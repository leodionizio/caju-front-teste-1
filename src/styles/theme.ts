export type Theme = {
  colors: {
    primary: string;
    textDark: string;
    textLight: string;
    backgroundLight: string;
    backgroundWhite: string;
    success: string;
    error: string;
    info: string;
    warning: string;
    inputBackground: string;
    inputBorder: string;
    borderLight: string;
    placeholder: string;
  };
  spacing: {
    small: string;
    medium: string;
    large: string;
  };
  borderRadius: string;
  shadows: {
    small: string;
    focus: string;
  };
};

export const theme: Theme = {
  colors: {
    primary: "#FF6B35",
    textDark: "#333333",
    textLight: "#FFFFFF",
    backgroundLight: "#F9F9F9",
    backgroundWhite: "#FFFFFF",
    success: "#28C76F",
    error: "#EA5455",
    info: "#007C89",
    warning: "#FFA500",
    inputBackground: "#F9F9F9",
    inputBorder: "#DCDCDC",
    borderLight: "#E0E0E0",
    placeholder: "#A0A0A0",
  },
  spacing: {
    small: "4px",
    medium: "16px",
    large: "48px",
  },
  borderRadius: "8px",
  shadows: {
    small: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
    focus: "0 4px 8px rgba(0, 124, 137, 0.2)",
  },
};
