import { useTranslation } from 'react-i18next';

import instagramIconDark from 'assets/images/instagram-dark.svg';
import instagramIconLight from 'assets/images/instagram-light.svg';
import whatsAppIconDark from 'assets/images/whatsApp-dark.svg';
import whatsAppIconLight from 'assets/images/whatsApp-light.svg';
import { useAppSelector } from 'redux/reduxHooks';
import { Theme } from 'redux/slices/themeSlice';
import { RootState } from 'redux/store';
import styles from './styles.module.css';

const getThemeIcon = (
  currentTheme: Theme,
  lightIcon: React.FunctionComponent<React.SVGAttributes<SVGElement>>,
  darkIcon: React.FunctionComponent<React.SVGAttributes<SVGElement>>
) => {
  if (currentTheme === Theme.LIGHT) {
    return lightIcon;
  } else {
    return darkIcon;
  }
};

const Contacts = () => {
  const { t } = useTranslation();
  const currentTheme = useAppSelector(
    (state: RootState) => state.theme.currentTheme
  );
  const whatsAppIcon = getThemeIcon(
    currentTheme,
    whatsAppIconLight,
    whatsAppIconDark
  );
  const instagramIcon = getThemeIcon(
    currentTheme,
    instagramIconLight,
    instagramIconDark
  );

  return (
    <footer id={styles.contacts__wrapper}>
      <div id={styles.contacts__infoWrapper}>
        <div id={styles.contacts__telWrapper}>
          <div id={styles.contacts__telTitle}>
            {t('contacts__PhoneTitleText')}
          </div>
          <div id={styles.contacts__telNumber}>+ 49 999 999 99 99</div>
          <div id={styles.contacts__socialLinksWrapper}>
            <div className={styles.contacts__socialLink}>
              <a href="https://instagram.com">
                <img
                  src={String(instagramIcon)}
                  alt="Instagram"
                  className={styles.contacts__socialLinkImage}
                />
                <br />
                Instagram
              </a>
            </div>
            <div className={styles.contacts__socialLink}>
              <a href="https://whatsapp.com">
                <img
                  src={String(whatsAppIcon)}
                  alt="WhatsApp"
                  className={styles.contacts__socialLinkImage}
                />
                <br />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
        <div id={styles.contacts__addressWrapper}>
          <div id={styles.contacts__addressTitle}>
            {t('contacts__AddressTitleText')}
          </div>
          <address>
            <a
              id={styles.contacts__address}
              href="http://g.page/telranDE?share"
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: t('contacts__AddressText', {
                    interpolation: { escapeValue: false },
                  }),
                }}
              />
            </a>
          </address>
          <div id={styles.contacts__workingTimeWrapper}>
            <div id={styles.contacts__workingTimeTitle}>
              {t('contacts__WorkingTimeTitle')}:
            </div>
            <div id={styles.contacts__workingTime}>
              {t('contacts__WorkingTimeText')}
            </div>
          </div>
        </div>
      </div>
      <div id={styles.contacts__mapWrapper}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.409221635401!2d13.37504469999999!3d52.50793289999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a8515353a68755%3A0xd0866511db4f838f!2sTel-Ran.de%20GmbH!5e0!3m2!1sde!2sde!4v1684860513069!5m2!1sde!2sde"
          width="100%"
          height="525"
          allowFullScreen
          loading="lazy"
          title="map"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </footer>
  );
};

export default Contacts;
