export const toPersinaDigit = (digits: number | string): string => {
  const fa = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return digits.toString().replaceAll(/\d/g, (w) => {
    return fa[+w];
  });
};

export const IsJsonString = (str: string): boolean => {
  try {
    JSON.parse(str);
  } catch {
    return false;
  }
  return true;
};
