import { showToastSuccess } from 'components/CommonComponents/Toasts/toasts';
import { useTranslation } from 'react-i18next';
import { sendPostRequest } from 'utils/sendPostRequest';

import styles from './styles.module.css';

const MainOffer = () => {
  const { t } = useTranslation();

  const targetUrl = '/sale/send';
  const queryData = { content: 'Query body ...' };

  const handleButtonClick = () => {
    showToastSuccess('The POST-query has been sent.');
    sendPostRequest(targetUrl, queryData);
  };

  return (
    <div id={styles.mainOffer__wrapper}>
      <div id={styles.mainOffer__detailsWrapper}>
        <div id={styles.mainOffer__details}>
          <div id={styles.mainOffer__detailsTitle}>
            {t('mainPage__MainOfferTitle')}
          </div>
          <div id={styles.mainOffer__detailsMessage}>
            {t('mainPage__MainOfferMessage')}
          </div>
          <button
            id={styles.mainOffer__detailsButton}
            onClick={() => handleButtonClick()}
          >
            {t('mainPage__MainOfferButtonText')}
          </button>
        </div>
      </div>
      <div id={styles.mainOffer__imageWrapper}>
        {/* Main offer image is in the background */}
      </div>
    </div>
  );
};

export default MainOffer;
