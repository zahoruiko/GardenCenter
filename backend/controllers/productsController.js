const asyncHandler = require("express-async-handler");
const Product = require("../database/models/product");
const Category = require("../database/models/category");
const { Op } = require("sequelize");
const {
  checkMinPrice,
  checkMaxPrice,
  checkId,
  checkSortingField,
  checkSortingDirection,
  checkSearchString,
  checkQueryLimit,
  checkQueryOffset,
} = require("../utils/checkUserInput");

// "/mostDiscounted"
exports.findMostDiscountedProducts = asyncHandler(async (req, res, next) => {
  const all = await Product.findAll({
    attributes: [
      "id",
      "title",
      "description",
      "image",
      "price",
      "discont_price",
      "discount_prozent",
    ],
    where: {
      discont_price: { [Op.ne]: null },
    },
  });

  if (all.length === 0) {
    res.status(404).json({ status: "ERR", message: "Products not found" });
    return;
  };

  // Sequalize does not allow sorting by virtual field, so we sort the array in JavaScript
  all.sort((a, b) => b.discount_prozent - a.discount_prozent);

  res
    .status(200)
    .json({ status: "OK", itemsAmount: all.length, data: all.slice(0, 4) });
});

// "/:id"
exports.findProductById = asyncHandler(async (req, res, next) => {
  const id = checkId(req, res);

  const one = await Product.findOne({
    attributes: [
      "id",
      "title",
      "description",
      "image",
      "price",
      "discont_price",
    ],
    where: { id: +id },
  });

  if (one === null) {
    res.status(404).json({ status: "ERR", message: "Product not found" });
    return;
  };

  res.status(200).json({ status: "OK", itemsAmount: 1, data: one });
});

// "/all/minPrice/:minPrice/maxPrice/:maxPrice/sortBy/:sortFieldName/sortDirection/:sortDirection"
exports.findAllProductsByPriceSliceSorted = asyncHandler(async (req, res, next) => {
    const minPrice = checkMinPrice(req, res);
    const maxPrice = checkMaxPrice(req, res);
    const dbSortingField = checkSortingField(req, res);
    const dbSortingDirection = checkSortingDirection(req, res);
    const queryLimit = checkQueryLimit(req, res);
    const queryOffset = checkQueryOffset(req, res);

    const all = await Product.findAll({
      where: {
        [Op.and]: [
          {
            price: { [Op.gte]: +minPrice },
          },
          {
            price: { [Op.lte]: +maxPrice },
          },
        ],
      },
    });

    const partData = await Product.findAll({
      attributes: [
        "id",
        "title",
        "description",
        "image",
        "price",
        "discont_price",
      ],
      where: {
        [Op.and]: [
          {
            price: { [Op.gte]: +minPrice },
          },
          {
            price: { [Op.lte]: +maxPrice },
          },
        ],
      },
      order: [[dbSortingField, dbSortingDirection]],
      limit: +queryLimit,
      offset: +queryOffset,
    });

    if (all.length === 0) {
      res.status(404).json({ status: "ERR", message: "Products not found" });
      return;
    };

    res
      .status(200)
      .json({ status: "OK", itemsAmount: all.length, data: partData });
  }
);

// "/all/discounted/minPrice/:minPrice/maxPrice/:maxPrice/sortBy/:sortFieldName/sortDirection/:sortDirection"
exports.findAllDiscountedProductsByPriceSliceSorted = asyncHandler(
  async (req, res, next) => {
    const minPrice = checkMinPrice(req, res);
    const maxPrice = checkMaxPrice(req, res);
    const dbSortingField = checkSortingField(req, res);
    const dbSortingDirection = checkSortingDirection(req, res);
    const queryLimit = checkQueryLimit(req, res);
    const queryOffset = checkQueryOffset(req, res);

    const all = await Product.findAll({
      where: {
        [Op.and]: [
          {
            discont_price: { [Op.ne]: null },
          },
          {
            discont_price: { [Op.gte]: +minPrice },
          },
          {
            discont_price: { [Op.lte]: +maxPrice },
          },
        ],
      },
    });

    const partData = await Product.findAll({
      attributes: [
        "id",
        "title",
        "description",
        "image",
        "price",
        "discont_price",
      ],
      where: {
        [Op.and]: [
          {
            discont_price: { [Op.ne]: null },
          },
          {
            discont_price: { [Op.gte]: +minPrice },
          },
          {
            discont_price: { [Op.lte]: +maxPrice },
          },
        ],
      },
      order: [[dbSortingField, dbSortingDirection]],
      limit: queryLimit,
      offset: queryOffset,
    });

    if (all.length === 0) {
      res.status(404).json({ status: "ERR", message: "Products not found" });
      return;
    };

    res
      .status(200)
      .json({ status: "OK", itemsAmount: all.length, data: partData });
  }
);

// "/category/:id/minPrice/:minPrice/maxPrice/:maxPrice/sortBy/:sortFieldName/sortDirection/:sortDirection"
exports.findProductsByCategoryIdAndPriceSliceSorted = asyncHandler(
  async (req, res, next) => {
    const id = checkId(req, res);
    const minPrice = checkMinPrice(req, res);
    const maxPrice = checkMaxPrice(req, res);
    const dbSortingField = checkSortingField(req, res);
    const dbSortingDirection = checkSortingDirection(req, res);
    const queryLimit = checkQueryLimit(req, res);
    const queryOffset = checkQueryOffset(req, res);

    const category = await Category.findOne({
      attributes: ["id", "title", "image"],
      where: { id: +id },
    });

    const all = await Product.findAll({
      where: {
        [Op.and]: [
          {
            categoryId: { [Op.eq]: +id },
          },
          {
            price: { [Op.gte]: +minPrice },
          },
          {
            price: { [Op.lte]: +maxPrice },
          },
        ],
      },
    });

    const partData = await Product.findAll({
      attributes: [
        "id",
        "title",
        "description",
        "image",
        "price",
        "discont_price",
      ],
      where: {
        [Op.and]: [
          {
            categoryId: { [Op.eq]: +id },
          },
          {
            price: { [Op.gte]: +minPrice },
          },
          {
            price: { [Op.lte]: +maxPrice },
          },
        ],
      },
      order: [[dbSortingField, dbSortingDirection]],
      limit: queryLimit,
      offset: queryOffset,
    });

    if (all.length === 0) {
      res.status(404).json({ status: "ERR", message: "Products not found" });
      return;
    };

    res
      .status(200)
      .json({ status: "OK", itemsAmount: all.length, category, data: partData });
  }
);

// "/category/:id/discounted/minPrice/:minPrice/maxPrice/:maxPrice/sortBy/:sortFieldName/sortDirection/:sortDirection"
exports.findDiscountedProductsByCategoryIdAndPriceSliceSorted = asyncHandler(
  async (req, res, next) => {
    const id = checkId(req, res);
    const minPrice = checkMinPrice(req, res);
    const maxPrice = checkMaxPrice(req, res);
    const dbSortingField = checkSortingField(req, res);
    const dbSortingDirection = checkSortingDirection(req, res);
    const queryLimit = checkQueryLimit(req, res);
    const queryOffset = checkQueryOffset(req, res);

    const category = await Category.findOne({
      attributes: ["id", "title", "image"],
      where: { id: +id },
    });

    const all = await Product.findAll({
      where: {
        [Op.and]: [
          {
            categoryId: { [Op.eq]: +id },
          },
          {
            discont_price: { [Op.ne]: null },
          },
          {
            discont_price: { [Op.gte]: +minPrice },
          },
          {
            discont_price: { [Op.lte]: +maxPrice },
          },
        ],
      },
    });

    const partData = await Product.findAll({
      attributes: [
        "id",
        "title",
        "description",
        "image",
        "price",
        "discont_price",
      ],
      where: {
        [Op.and]: [
          {
            categoryId: { [Op.eq]: +id },
          },
          {
            discont_price: { [Op.ne]: null },
          },
          {
            discont_price: { [Op.gte]: +minPrice },
          },
          {
            discont_price: { [Op.lte]: +maxPrice },
          },
        ],
      },
      order: [[dbSortingField, dbSortingDirection]],
      limit: queryLimit,
      offset: queryOffset,
    });

    if (all.length === 0) {
      res.status(404).json({ status: "ERR", message: "Products not found" });
      return;
    };

    res
      .status(200)
      .json({ status: "OK", itemsAmount: all.length, category, data: partData });
  }
);

// "/category/:id/searchTerm/:searchTerm/minPrice/:minPrice/maxPrice/:maxPrice/sortBy/:sortFieldName/sortDirection/:sortDirection"
exports.findProductsByCategoryIdAndSearchTermAndPriceSliceSorted = asyncHandler(
  async (req, res, next) => {
    const id = checkId(req, res);
    const searchString = checkSearchString(req, res);
    const minPrice = checkMinPrice(req, res);
    const maxPrice = checkMaxPrice(req, res);
    const dbSortingField = checkSortingField(req, res);
    const dbSortingDirection = checkSortingDirection(req, res);
    const queryLimit = checkQueryLimit(req, res);
    const queryOffset = checkQueryOffset(req, res);

    const category = await Category.findOne({
      attributes: ["id", "title", "image"],
      where: { id: +id },
    });

    const all = await Product.findAll({
      where: {
        [Op.and]: [
          {
            categoryId: { [Op.eq]: +id },
          },
          {
            price: { [Op.gte]: +minPrice },
          },
          {
            price: { [Op.lte]: +maxPrice },
          },
        ],
        [Op.or]: [
          {
            title: { [Op.substring]: searchString },
          },
          {
            description: { [Op.substring]: searchString },
          },
        ],
      },
    });

    const partData = await Product.findAll({
      attributes: [
        "id",
        "title",
        "description",
        "image",
        "price",
        "discont_price",
      ],
      where: {
        [Op.and]: [
          {
            categoryId: { [Op.eq]: +id },
          },
          {
            price: { [Op.gte]: +minPrice },
          },
          {
            price: { [Op.lte]: +maxPrice },
          },
        ],
        [Op.or]: [
          {
            title: { [Op.substring]: searchString },
          },
          {
            description: { [Op.substring]: searchString },
          },
        ],
      },
      order: [[dbSortingField, dbSortingDirection]],
      limit: queryLimit,
      offset: queryOffset,
    });

    if (all.length === 0) {
      res.status(404).json({ status: "ERR", message: "Products not found" });
      return;
    };

    res
      .status(200)
      .json({ status: "OK", itemsAmount: all.length, category, data: partData });
  }
);


// "/category/:id/searchTerm/:searchTerm/discounted/minPrice/:minPrice/maxPrice/:maxPrice/sortBy/:sortFieldName/sortDirection/:sortDirection"
exports.findDiscountedProductsByCategoryIdAndSearchTermAndPriceSliceSorted = asyncHandler(
  async (req, res, next) => {
    const id = checkId(req, res);
    const searchString = checkSearchString(req, res);
    const minPrice = checkMinPrice(req, res);
    const maxPrice = checkMaxPrice(req, res);
    const dbSortingField = checkSortingField(req, res);
    const dbSortingDirection = checkSortingDirection(req, res);
    const queryLimit = checkQueryLimit(req, res);
    const queryOffset = checkQueryOffset(req, res);

    const category = await Category.findOne({
      attributes: ["id", "title", "image"],
      where: { id: +id },
    });

    const all = await Product.findAll({
      where: {
        [Op.and]: [
          {
            categoryId: { [Op.eq]: +id },
          },
          {
            discont_price: { [Op.ne]: null },
          },
          {
            discont_price: { [Op.gte]: +minPrice },
          },
          {
            discont_price: { [Op.lte]: +maxPrice },
          },
        ],
        [Op.or]: [
          {
            title: { [Op.substring]: searchString },
          },
          {
            description: { [Op.substring]: searchString },
          },
        ],
      },
    });

    const partData = await Product.findAll({
      attributes: [
        "id",
        "title",
        "description",
        "image",
        "price",
        "discont_price",
      ],
      where: {
        [Op.and]: [
          {
            categoryId: { [Op.eq]: +id },
          },
          {
            discont_price: { [Op.ne]: null },
          },
          {
            discont_price: { [Op.gte]: +minPrice },
          },
          {
            discont_price: { [Op.lte]: +maxPrice },
          },
        ],
        [Op.or]: [
          {
            title: { [Op.substring]: searchString },
          },
          {
            description: { [Op.substring]: searchString },
          },
        ],
      },
      order: [[dbSortingField, dbSortingDirection]],
      limit: queryLimit,
      offset: queryOffset,
    });

    if (all.length === 0) {
      res.status(404).json({ status: "ERR", message: "Products not found" });
      return;
    };

    res
      .status(200)
      .json({ status: "OK", itemsAmount: all.length, category, data: partData });
  }
);


// "/find/:searchTerm/minPrice/:minPrice/maxPrice/:maxPrice/sortBy/:sortFieldName/sortDirection/:sortDirection"
exports.findProductsBySearchStringSortedPriceSlice = asyncHandler(
  async (req, res, next) => {
    const searchString = checkSearchString(req, res);
    const minPrice = checkMinPrice(req, res);
    const maxPrice = checkMaxPrice(req, res);
    const dbSortingField = checkSortingField(req, res);
    const dbSortingDirection = checkSortingDirection(req, res);
    const queryLimit = checkQueryLimit(req, res);
    const queryOffset = checkQueryOffset(req, res);

    const all = await Product.findAll({
      where: {
        [Op.or]: [
          {
            title: { [Op.substring]: searchString },
          },
          {
            description: { [Op.substring]: searchString },
          },
        ],
        [Op.and]: [
          {
            price: { [Op.gte]: +minPrice },
          },
          {
            price: { [Op.lte]: +maxPrice },
          },
        ],
      },
    });

    const pageData = await Product.findAll({
      attributes: [
        "id",
        "title",
        "description",
        "image",
        "price",
        "discont_price",
      ],
      where: {
        [Op.or]: [
          {
            title: { [Op.substring]: searchString },
          },
          {
            description: { [Op.substring]: searchString },
          },
        ],
        [Op.and]: [
          {
            price: { [Op.gte]: +minPrice },
          },
          {
            price: { [Op.lte]: +maxPrice },
          },
        ],
      },
      order: [[dbSortingField, dbSortingDirection]],
      limit: queryLimit,
      offset: queryOffset,
    });

    if (all.length === 0) {
      res
        .status(404)
        .json({ status: "ERR", message: "Products not found", data: null });
      return;
    };

    res.status(200).json({ status: "OK", itemsAmount: all.length, data: pageData });
  }
);

// "/find/:searchTerm/discounted/minPrice/:minPrice/maxPrice/:maxPrice/sortBy/:sortFieldName/sortDirection/:sortDirection"
exports.findDiscountedProductsBySearchStringSortedPriceSlice = asyncHandler(
  async (req, res, next) => {
    const searchString = checkSearchString(req, res);
    const minPrice = checkMinPrice(req, res);
    const maxPrice = checkMaxPrice(req, res);
    const dbSortingField = checkSortingField(req, res);
    const dbSortingDirection = checkSortingDirection(req, res);
    const queryLimit = checkQueryLimit(req, res);
    const queryOffset = checkQueryOffset(req, res);

    const all = await Product.findAll({
      where: {
        [Op.or]: [
          {
            title: { [Op.substring]: searchString },
          },
          {
            description: { [Op.substring]: searchString },
          },
        ],
        [Op.and]: [
          {
            discont_price: { [Op.ne]: null },
          },
          {
            discont_price: { [Op.gte]: +minPrice },
          },
          {
            discont_price: { [Op.lte]: +maxPrice },
          },
        ],
      },
    });

    const pageData = await Product.findAll({
      attributes: [
        "id",
        "title",
        "description",
        "image",
        "price",
        "discont_price",
      ],
      where: {
        [Op.or]: [
          {
            title: { [Op.substring]: searchString },
          },
          {
            description: { [Op.substring]: searchString },
          },
        ],
        [Op.and]: [
          {
            discont_price: { [Op.ne]: null },
          },
          {
            discont_price: { [Op.gte]: +minPrice },
          },
          {
            discont_price: { [Op.lte]: +maxPrice },
          },
        ],
      },
      order: [[dbSortingField, dbSortingDirection]],
      limit: queryLimit,
      offset: queryOffset,
    });

    if (all.length === 0) {
      res.status(404).json({ status: "ERR", message: "Products not found" });
      return;
    };

    res.status(200).json({ status: "OK", itemsAmount: all.length, data: pageData });
  }
);

exports.addProduct = asyncHandler(async (req, res, next) => {
  const { title, price, discont_price, description, categoryId } = req.params;
  Product.create({ title, price, discont_price, description, categoryId });
  res.status(201).json(`Success.`);
});
