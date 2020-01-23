import PropTypes from 'prop-types';
import React from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import BMEVIKLogoSrc from '../data/logos/bme-vik.svg';
import SchonherzLogoSrc from '../data/logos/schonherz.svg';
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
      <a
        href="https://www.vik.bme.hu"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={BMEVIKLogoSrc}
          alt="BME Villamosmérnöki és Informatikai Kar"
          className={styles.logo}
        />
      </a>

      <img src={SchonherzLogoSrc} alt="Schönherz" className={styles.logo} />

      <div className={styles.iconsContainer}>
        <a href={siteFacebookURL} target="_blank" rel="noopener noreferrer">
          <FaFacebook />
        </a>

        <a href={siteYouTubeURL} target="_blank" rel="noopener noreferrer">
          <FaYoutube />
        </a>

        <a href={siteGitHubURL} target="_blank" rel="noopener noreferrer">
          <FaGithub />
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
