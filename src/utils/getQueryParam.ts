export const getQueryParam = (param: Record<string, string>): string => {
  const key = Object.keys(param)[0];
  const value = param[key];

  if (!key || !value) return "";

  return `?${key}=${encodeURIComponent(value)}`;
};
