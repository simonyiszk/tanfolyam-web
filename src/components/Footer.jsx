import PropTypes from 'prop-types';
import React from 'react';
import FaEnvelope from 'react-icons/lib/fa/envelope';
import FaFacebookOfficial from 'react-icons/lib/fa/facebook-official';
import FaGitHub from 'react-icons/lib/fa/github';
import FaYouTubePlay from 'react-icons/lib/fa/youtube-play';
import BMEVIKLogoSrc from '../data/logos/bme-vik.svg';
import Container from './Container';
import styles from './Footer.module.scss';

const Footer = ({
  siteEmailURL,
  siteFacebookURL,
  siteYouTubeURL,
  siteGitHubURL,
  className,
  ...props
}) => (
  <footer className={`${styles.root} ${className}`} {...props}>
    <Container>
      <img
        src={BMEVIKLogoSrc}
        alt="BME Villamosmérnöki és Informatikai Kar"
        className={styles.logo}
      />

      <div className={styles.iconsContainer}>
        <a href={siteFacebookURL} target="_blank" rel="noopener noreferrer">
          <FaFacebookOfficial />
        </a>

        <a href={siteYouTubeURL} target="_blank" rel="noopener noreferrer">
          <FaYouTubePlay />
        </a>

        <a href={siteGitHubURL} target="_blank" rel="noopener noreferrer">
          <FaGitHub />
        </a>

        <a href={siteEmailURL}>
          <FaEnvelope />
        </a>
      </div>
    </Container>
  </footer>
);

Footer.propTypes = {
  siteEmailURL: PropTypes.string.isRequired,
  siteFacebookURL: PropTypes.string.isRequired,
  siteYouTubeURL: PropTypes.string.isRequired,
  siteGitHubURL: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Footer.defaultProps = {
  className: '',
};

export default Footer;
