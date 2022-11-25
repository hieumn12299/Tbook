import React from 'react';
import styles from './sliderShowImage.module.scss';

const SliderShowImage = () => {
  return (
    <figure className="w-full h-[285px]">
      <div className={styles.imagesContainer}>
        <div className={`${styles.imageDiv} ${styles.image1}`}></div>
        <div
          className={`${styles.imageDiv} ${styles.image2} ${styles.fadeInClass}`}
        ></div>
      </div>
    </figure>
  );
};

export default SliderShowImage;
