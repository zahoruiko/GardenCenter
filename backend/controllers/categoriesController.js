const asyncHandler = require("express-async-handler");
const { Op } = require("sequelize");
const Category = require("../database/models/category");
const { checkIdsListString, checkId } = require("../utils/checkUserInput");

// "/all"
exports.findAllCategories = asyncHandler(async (req, res, next) => {
  const all = await Category.findAll({
    attributes: ["id", "title", "image"],
  });

  if (all.length === 0) {
    res.status(404).json({ status: "ERR", message: "Categories not found" });
    return;
  };

  res.status(200).json({ status: "OK", data: all });
});

// "/ids/:categoryIdsList"
exports.findCategoriesByIds = asyncHandler(async (req, res, next) => {
  const categoryIdsListArray = checkIdsListString(req, res);

  const all = await Category.findAll({
    attributes: ["id", "title", "image"],
    where: {
      id: { [Op.in]: [...categoryIdsListArray] },
    },
  });

  if (all.length === 0) {
    res.status(404).json({ status: "ERR", message: "Categories not found" });
    return;
  };

  res.status(200).json({ status: "OK", data: all });
});

// "/:id"
exports.findCategoryById = asyncHandler(async (req, res, next) => {
  const id = checkId(req, res);

  const category = await Category.findOne({
    attributes: ["id", "title", "image"],
    where: { id: +id },
  });

  if (category === null) {
    res.status(404).json({ status: "ERR", message: "Category not found" });
    return;
  };

  res.status(200).json({ status: "OK", category });
});
