import ContentLoader from "react-content-loader";
import React from "react";

const ProductPageDummy: React.FC<any> = (props) => (
  <ContentLoader
    speed={2}
    width={1440}
    height={2160}
    viewBox="0 0 400 600"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="6" y="69" rx="0" ry="0" width="198" height="196" />
    <rect x="249" y="115" rx="3" ry="3" width="60" height="25" />
    <rect x="249" y="82" rx="3" ry="3" width="134" height="20" />
    <rect x="250" y="153" rx="3" ry="3" width="132" height="5" />
    <rect x="251" y="173" rx="3" ry="3" width="131" height="75" />
    <rect x="7" y="44" rx="3" ry="3" width="283" height="15" />
  </ContentLoader>
);

export default ProductPageDummy;
