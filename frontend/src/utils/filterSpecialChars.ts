export const sanitizeNumbers = (str: string) => {
  return str.replace(/[^\d]/g, "");
};

export const sanitizeCharsAndNumbers = (str: string) => {
  return str.replace(/[^\d\w ]/g, "");
};

export const sanitizeCharsNumbersSpezChars = (str: string) => {
  return str.replace(/[^\d\w'"`,.:\-()&™ ]/g, "");
};
