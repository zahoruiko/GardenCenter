export type TProductItem = {
  id: number;
  title: string;
  price: number;
  discont_price: number;
  image: string;
};

export type TRenderSuccessAdditionalParams = {
  title: string;
  description: string;
  showDiscountedProductsCheckbox: boolean;
  targetUrl: string;
};

export type TRenderLoaderAdditionalParams = {
  title: string;
};

export type TRenderErrorAdditionalParams = {
  title?: string;
  targetUrl?: string;
};
