import ContentLoader from "react-content-loader";
import React from "react";

const ProductsListItemDummyDark: React.FC<any> = (props) => (
  <ContentLoader
    speed={2}
    width={330}
    height={431}
    viewBox="0 0 330 431"
    backgroundColor="#a3a3a3"
    foregroundColor="#8c8b8b"
    {...props}
  >
    <rect x="3" y="-2" rx="20" ry="20" width="330" height="300" />
    <rect x="25" y="327" rx="3" ry="3" width="285" height="32" />
    <rect x="25" y="387" rx="3" ry="3" width="285" height="25" />
  </ContentLoader>
);

export default ProductsListItemDummyDark;
