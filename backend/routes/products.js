const express = require("express");
const router = express.Router();
const products_controller = require("../controllers/productsController");

router.get(
  "/mostDiscounted", 
  products_controller.findMostDiscountedProducts
);

router.get(
  "/:id", 
  products_controller.findProductById
);

router.get(
  "/all/minPrice/:minPrice/maxPrice/:maxPrice/sortBy/:sortFieldName/sortDirection/:sortDirection",
  products_controller.findAllProductsByPriceSliceSorted
);

router.get(
  "/all/discounted/minPrice/:minPrice/maxPrice/:maxPrice/sortBy/:sortFieldName/sortDirection/:sortDirection",
  products_controller.findAllDiscountedProductsByPriceSliceSorted
);

router.get(
  "/find/:searchString/minPrice/:minPrice/maxPrice/:maxPrice/sortBy/:sortFieldName/sortDirection/:sortDirection",
  products_controller.findProductsBySearchStringSortedPriceSlice
);

router.get(
  "/find/:searchString/discounted/minPrice/:minPrice/maxPrice/:maxPrice/sortBy/:sortFieldName/sortDirection/:sortDirection",
  products_controller.findDiscountedProductsBySearchStringSortedPriceSlice
);

router.get(
  "/category/:id/minPrice/:minPrice/maxPrice/:maxPrice/sortBy/:sortFieldName/sortDirection/:sortDirection",
  products_controller.findProductsByCategoryIdAndPriceSliceSorted
);

router.get(
  "/category/:id/discounted/minPrice/:minPrice/maxPrice/:maxPrice/sortBy/:sortFieldName/sortDirection/:sortDirection",
  products_controller.findDiscountedProductsByCategoryIdAndPriceSliceSorted
);

router.get(
  "/category/:id/searchTerm/:searchString/minPrice/:minPrice/maxPrice/:maxPrice/sortBy/:sortFieldName/sortDirection/:sortDirection",
  products_controller.findProductsByCategoryIdAndSearchTermAndPriceSliceSorted
);

router.get(
  "/category/:id/searchTerm/:searchString/discounted/minPrice/:minPrice/maxPrice/:maxPrice/sortBy/:sortFieldName/sortDirection/:sortDirection",
  products_controller.findDiscountedProductsByCategoryIdAndSearchTermAndPriceSliceSorted
);

router.get(
  "/add/:title/:price/:discont_price/:description",
  products_controller.addProduct
);

module.exports = router;
