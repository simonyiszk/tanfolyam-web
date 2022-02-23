import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './BrandedHero.module.scss';

const BrandedHero = ({
  backgroundImage,
  heroImageSrc,
  heroImageAlt,
  className,
  ...props
}) => (
  <div className={`${styles.root} ${className}`} {...props}>
    <Img sizes={backgroundImage} className={styles.backgroundImage} />
    <a href="https://simonyi.bme.hu">
      <img src={heroImageSrc} alt={heroImageAlt} className={styles.heroImage} />
    </a>
  </div>
);

BrandedHero.propTypes = {
  backgroundImage: PropTypes.shape({}).isRequired,
  heroImageSrc: PropTypes.string.isRequired,
  heroImageAlt: PropTypes.string,
  className: PropTypes.string,
};

BrandedHero.defaultProps = {
  heroImageAlt: '',
  className: '',
};

export default BrandedHero;
