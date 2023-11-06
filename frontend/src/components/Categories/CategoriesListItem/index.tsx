import React from 'react';

import { NavLink } from 'react-router-dom';

import { backendUrl } from '../../../config/mainConstants';
import styles from './styles.module.css';

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
        <figure className={styles.catalog__category}>
          <div className={styles.catalog__categoryImage}>
            <img src={imgUrl} alt={title} title={title} />
          </div>
          <figcaption className={styles.catalog__categoryTitle}>
            {title}
          </figcaption>
        </figure>
      </div>
    </NavLink>
  );
};

export default CategoriesListItem;
