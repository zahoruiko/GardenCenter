import React from "react";
import { NavLink } from "react-router-dom";

import { backendUrl } from "../../../config/mainConstants";

import styles from "./CategoriesListItem.module.css";

export type TCategoriesListItemProps = {
  id: number;
  title: string;
  image: string;
};

const CategoriesListItem: React.FC<TCategoriesListItemProps> = ({
  id,
  title,
  image,
}) => {
  const imgUrl = backendUrl + image;
  return (
    <NavLink
      to={`/category/${id}/${title}/`}
      className={styles.link__decoration}
    >
      <div className={styles.catalog__categoryWrapper}>
        <div className={styles.catalog__category}>
          <figure className={styles.catalog__categoryImage}>
            <img src={imgUrl} alt={title} title={title} />
          </figure>
          <figcaption className={styles.catalog__categoryTitle}>
            {title}
          </figcaption>
        </div>
      </div>
    </NavLink>
  );
};

export default CategoriesListItem;
