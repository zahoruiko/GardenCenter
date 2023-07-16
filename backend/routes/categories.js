const express = require("express");
const router = express.Router();

const categories_controller = require("../controllers/categoriesController");

router.get("/all", categories_controller.findAllCategories);

router.get("/ids/:categoryIdsList", categories_controller.findCategoriesByIds);

router.get("/:id", categories_controller.findCategoryById);

module.exports = router;
