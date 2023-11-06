import { RouteProps } from "react-router-dom";

import AllProductsPage from "../pages/AllProductsPage";
import CategoriesPage from "../pages/CategoriesPage";
import CategoryProductsPage from "../pages/CategoryProductsPage";
import DiscountProductsPage from "../pages/DiscountProductsPage";
import MainPage from "../pages/MainPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProductPage from "../pages/ProductPage";
import ShoppingCartPage from "../pages/ShoppingCartPage";

export enum AppRoute {
  MAIN_PAGE = "MAIN_PAGE",
  CATEGORIES = "CATEGORIES",
  CATEGORY_PRODUCTS = "CATEGORY_PRODUCTS",
  CATEGORY_PRODUCTS_BY_PARTS = "CATEGORY_PRODUCTS_BY_PARTS",
  PRODUCT = "PRODUCT",
  ALL_PRODUCTS = "ALL_PRODUCTS",
  ALL_PRODUCTS_BY_PARTS = "ALL_PRODUCTS_BY_PARTS",
  DISCOUNT_PRODUCTS = "DISCOUNT_PRODUCTS",
  DISCOUNT_PRODUCTS_BY_PARTS = "DISCOUNT_PRODUCTS_BY_PARTS",
  SHOPPING_CART = "SHOPPING_CART",
  NOT_FOUND = "NOT_FOUND",
}

export const RoutePath: Record<AppRoute, string> = {
  [AppRoute.MAIN_PAGE]: "/",
  [AppRoute.CATEGORIES]: "/categories",
  [AppRoute.CATEGORY_PRODUCTS]: "/category/:id/:categoryTitle/",
  [AppRoute.CATEGORY_PRODUCTS_BY_PARTS]: "/category/:id/:categoryTitle/:part/",
  [AppRoute.PRODUCT]: "/product/:id/:productTitle/",
  [AppRoute.ALL_PRODUCTS]: "/allProducts",
  [AppRoute.ALL_PRODUCTS_BY_PARTS]: "/allProducts/:part/",
  [AppRoute.DISCOUNT_PRODUCTS]: "/discountProducts",
  [AppRoute.DISCOUNT_PRODUCTS_BY_PARTS]: "/discountProducts/:part/",
  [AppRoute.SHOPPING_CART]: "/shoppingCart",
  [AppRoute.NOT_FOUND]: "*",
};

export const routesConfig: Record<AppRoute, RouteProps> = {
  [AppRoute.MAIN_PAGE]: {
    path: RoutePath.MAIN_PAGE,
    element: <MainPage />,
  },
  [AppRoute.CATEGORIES]: {
    path: RoutePath.CATEGORIES,
    element: <CategoriesPage />,
  },
  [AppRoute.CATEGORY_PRODUCTS]: {
    path: RoutePath.CATEGORY_PRODUCTS,
    element: <CategoryProductsPage />,
  },
  [AppRoute.CATEGORY_PRODUCTS_BY_PARTS]: {
    path: RoutePath.CATEGORY_PRODUCTS_BY_PARTS,
    element: <CategoryProductsPage />,
  },
  [AppRoute.PRODUCT]: {
    path: RoutePath.PRODUCT,
    element: <ProductPage />,
  },
  [AppRoute.ALL_PRODUCTS]: {
    path: RoutePath.ALL_PRODUCTS,
    element: <AllProductsPage />,
  },
  [AppRoute.ALL_PRODUCTS_BY_PARTS]: {
    path: RoutePath.ALL_PRODUCTS_BY_PARTS,
    element: <AllProductsPage />,
  },
  [AppRoute.DISCOUNT_PRODUCTS]: {
    path: RoutePath.DISCOUNT_PRODUCTS,
    element: <DiscountProductsPage />,
  },
  [AppRoute.DISCOUNT_PRODUCTS_BY_PARTS]: {
    path: RoutePath.DISCOUNT_PRODUCTS_BY_PARTS,
    element: <DiscountProductsPage />,
  },
  [AppRoute.SHOPPING_CART]: {
    path: RoutePath.SHOPPING_CART,
    element: <ShoppingCartPage />,
  },
  [AppRoute.NOT_FOUND]: {
    path: RoutePath.NOT_FOUND,
    element: <NotFoundPage />,
  },
};
