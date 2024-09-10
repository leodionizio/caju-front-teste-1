type Config = {
  apiBaseUrl: string;
};

export const config: Config = {
  apiBaseUrl: process.env.VITE_API_BASE_URL || "http://localhost:3000",
};
