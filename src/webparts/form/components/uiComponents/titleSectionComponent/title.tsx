import * as React from 'react';
import styles from '../../Form.module.scss';

interface TitleProps {
  formStatus: string;
}

const Title: React.FC<TitleProps> = ({ formStatus }) => {
  const currentDate: Date = new Date();
  const formattedDate: string = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
  
  return (
    <div>
      <div
        className={`${styles.noteTitle} 
        ${styles.commonProperties}`}
      >
        <h1 className={`${styles.responsiveTitle}`}>
          eCommittee Note - {formStatus}
        </h1>
      </div>
      <p className={`${styles.responsiveTitle}`} style={{ textAlign: 'right' }}>
        Date : {formattedDate}
      </p>
    </div>
  );
};

export default Title;
