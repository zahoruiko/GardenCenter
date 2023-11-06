const isInt = (n: number) => {
  return n % 1 === 0;
};

exports.isInt = isInt;

const isFloat = (n: number) => {
  return n % 1 !== 0;
};

exports.isFloat = isFloat;

const isValidId = (id: number) => {
  return !isNaN(id) && isInt(id) && id > 0;
};

exports.isValidId = isValidId;

const isInvalidId = (id: number) => {
  return isNaN(id) || !isInt(id) || id <= 0;
};

exports.isInvalidId = isInvalidId;

const isPositiveIntGreaterThanZero = (value: number) => {
  return value !== null && !isNaN(value) && isInt(value) && value > 0;
};

exports.isPositiveIntGreaterThanZero = isPositiveIntGreaterThanZero;

const isInvalidPrice = (price: number) => {
  return isNaN(price) || price < 0;
};

exports.isInvalidPrice = isInvalidPrice;

const isValidPrice = (price: number) => {
  return !isNaN(price) && price >= 0;
};

exports.isValidPrice = isValidPrice;

export {}; // this is necessary to disable the import error of this file
