const isInt = (n) => {
  return n % 1 === 0;
};
exports.isInt = isInt;

const isFloat = (n) => {
  return n % 1 !== 0;
};
exports.isFloat = isFloat;

const isValidId = (id) => {
  let filteredId = sanitizeNumbers(id);
  return +filteredId === +id && !isNaN(id) && isInt(id) && id > 0;
};
exports.isValidId = isValidId;

const isInvalidId = (id) => {
  let filteredId = sanitizeNumbers(id);
  return +filteredId !== +id || isNaN(id) || !isInt(id) || id <= 0;
};
exports.isInvalidId = isInvalidId;

const isPositiveIntGreaterThanZero = (value) => {
  const filteredValue = sanitizeNumbers(value);
  return +filteredValue === +value && value !== null && !isNaN(value) && isInt(value) && value > 0;
};
exports.isPositiveIntGreaterThanZero = isPositiveIntGreaterThanZero;

const isInvalidPrice = (price) => {
  const filteredPrice = sanitizeNumbers(price);
  return +filteredPrice !== +price || isNaN(price) || price < 0;
};
exports.isInvalidPrice = isInvalidPrice;

const isValidPrice = (price) => {
  const filteredPrice = sanitizeNumbers(price);
  return +filteredPrice === +price && !isNaN(price) && price >= 0;
};
exports.isValidPrice = isValidPrice;

const checkIdsListString = (req, res) => {
  const { categoryIdsList } = req.params;
  if(categoryIdsList) {
    let categoryIdsListArray = categoryIdsList.split(",");
    if (categoryIdsListArray.length >= 0) {
      for(let i = 0; i < categoryIdsListArray.length; i++) {
        if(isInvalidId(categoryIdsListArray[i])) {
          res.status(400).json({ status: "ERR", message: "Invalid category id" });
          return;
        }
      }
      return categoryIdsListArray;
    } else {
      res.status(404).json({ status: "ERR", message: "Categories not found" });
      return;
    }
  } else {
    res.status(400).json({ status: "ERR", message: "Ids list is empty"});
    return;
  }
}
exports.checkIdsListString = checkIdsListString;

const checkId = (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    res.status(400).json({ status: "ERR", message: "Invalid id" });
    return;
  } else {
    return id;
  }
}
exports.checkId = checkId;

const checkMinPrice = (req, res) => {
  const { minPrice } = req.params;
  if (!isValidPrice(minPrice)) {
    res.status(400).json({ status: "ERR", message: "Invalid minPrice" });
    return;
  }
  return minPrice;
}
exports.checkMinPrice = checkMinPrice;

const checkMaxPrice = (req, res) => {
  const { maxPrice } = req.params;
  if (!isValidPrice(maxPrice)) {
    res.status(400).json({ status: "ERR", message: "Invalid maxPrice" });
    return;
  } 
  return maxPrice;
}
exports.checkMaxPrice = checkMaxPrice;

const checkPriceRange = (req, res, minPrice, maxPrice) => {
  if(minPrice > maxPrice) {
    res.status(400).json({ status: "ERR", message: "Invalid price range: minPrice > maxPrice" });
    return;
  }
}
exports.checkPriceRange = checkPriceRange;

const checkSortingField = (req, res) => {
  const { sortFieldName} = req.params;
  switch (sortFieldName) {
    case "id":
      return "id";
    case "title":
      return "title";
    case "price":
      return "price";
    case "discont_price":
      return "discont_price";
    case "createdAt":
      return "createdAt";
    default: {
      res.status(400).json({ status: "ERR", message: "Invalid sorting field" });
      return;
    }
  }
}
exports.checkSortingField = checkSortingField;

const checkSortingDirection = (req, res) => {
  const { sortDirection } = req.params;
  if (sortDirection === "asc" || sortDirection === "ASC") {
    return "ASC";
  } else if (sortDirection === "desc" || sortDirection === "DESC") {
    return "DESC";
  } else {
    return "ASC";
  }
}
exports.checkSortingDirection = checkSortingDirection;

const checkSearchString = (req, res) => {
  const { searchString } = req.params;
    return searchString.replace(/^[^!@#$%^&*?()_]$/, "");
};
exports.checkSearchString = checkSearchString;

const checkQueryLimit = (req, res) => {
  if (req.query.limit !== undefined) {
    if (isPositiveIntGreaterThanZero(req.query.limit)) {
      return req.query.limit;
    } else {
      res
        .status(400)
        .json({ status: "ERR", message: "Invalid query limit value" });
      return;
    }
  }
}
exports.checkQueryLimit = checkQueryLimit;

const checkQueryOffset = (req, res) => {
  const offset = sanitizeNumbers(req.query.offset)
  if (offset !== undefined && offset % 2 === 0) {
    if (offset >= 0) {
      return offset;
    } else {
      res
        .status(400)
        .json({ status: "ERR", message: "Invalid query offset value" });
      return;
    }
  }
}
exports.checkQueryOffset = checkQueryOffset;

const sanitizeCharsAndNumbers = (str) => {
  return str.replace(/[^\d\w \.\e\+]/g, "");
}
exports.sanitizeCharsAndNumbers = sanitizeCharsAndNumbers;

const sanitizeNumbers = (str) => {
  return str.replace(/[^\d\.\e\+]/g, "");
};
exports.sanitizeNumbers = sanitizeNumbers;

const sanitizeCharsNumbersSpezChars = (str) => {
  return str.replace(/[^\d\w'",. \.\e\+]/g, "");
};
exports.sanitizeCharsNumbersSpezChars = sanitizeCharsNumbersSpezChars;
