import * as React from 'react';
import styles from '../../Form.module.scss';

const Title: React.FC = () => {
const currentDate: Date = new Date();
const formattedDate: string = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
  return (
    <div className={`${styles.noteTitle} ${styles.commonProperties}`}>
      {/* <span className={`${styles.responsiveTitle} `}>Home Icon</span> */}
      <h1 className={`${styles.responsiveTitle} `}>eCommittee Note - New</h1>
      <p
       className={`${styles.responsiveTitle} `}>Date : {formattedDate}</p>
    </div>
  );
};

export default Title;
