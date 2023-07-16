import React from 'react';
import { Helmet } from 'react-helmet';

type TPageMetaDataProps = {
  title: string;
  description: string;
}

const PageMetaData: React.FC<TPageMetaDataProps> = ({title, description}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  )
}

export default PageMetaData