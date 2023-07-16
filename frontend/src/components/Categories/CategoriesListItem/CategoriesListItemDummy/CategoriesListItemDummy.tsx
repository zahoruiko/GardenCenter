import ContentLoader from "react-content-loader";
import React from "react";

export const CategoriesListItemDummy: React.FC<any> = (props) => (
  <ContentLoader
    speed={2}
    width={337}
    height={431}
    viewBox="0 0 337 431"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="10" y="10" rx="3" ry="3" width="318" height="350" />
    <rect x="30" y="382" rx="3" ry="3" width="280" height="30" />
  </ContentLoader>
);
