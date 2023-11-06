import { useTranslation } from 'react-i18next';

const NotFoundContainer = () => {
  const { t } = useTranslation();
  return (
    <>
      <img
        src="/images/notFound/image 12.png"
        id="image__notFound"
        alt={t('notFoundPage__imageAltText')}
      />
    </>
  );
};

export default NotFoundContainer;
