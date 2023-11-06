import React from 'react';

import styles from './styles.module.css';

type TMainWrapperProps = {
  children: React.ReactNode;
};

const MainWrapper: React.FC<TMainWrapperProps> = ({ children }) => {
  return <div className={styles.mainWrapper}>{children}</div>;
};

export default MainWrapper;
