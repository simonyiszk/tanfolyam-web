import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import BrandedHero from '../components/BrandedHero';
import Footer from '../components/Footer';
import SimonyiLightLogoSrc from '../data/logos/simonyi-light.svg';
import styles from './index.module.scss';
import './index.scss';

const IndexLayout = ({ children, data }) => (
  <div className={styles.root}>
    <Helmet
      titleTemplate={`%s | ${data.site.siteMetadata.title}`}
      defaultTitle={data.site.siteMetadata.title}
    >
      <html lang="hu" />

      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <link
        href="https://fonts.googleapis.com/css?family=Montserrat"
        rel="stylesheet"
      />

      {/* Global site tag (gtag.js) - Google Analytics */}
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=UA-113797893-1"
      />
      {/* eslint-disable */}
      <script>
        window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(
          arguments,
        )}
        gtag('js', new Date()); gtag('config', 'UA-113797893-1');
      </script>
      {/* eslint-enable */}
    </Helmet>

    <header>
      <BrandedHero
        backgroundImage={data.simonyiClubRoom.childImageSharp.sizes}
        heroImageSrc={SimonyiLightLogoSrc}
        heroImageAlt={data.site.siteMetadata.title}
      />
    </header>

    <main className={styles.main}>{children()}</main>

    <Footer
      siteEmailURL={data.site.siteMetadata.siteEmailURL}
      siteFacebookURL={data.site.siteMetadata.siteFacebookURL}
      siteYouTubeURL={data.site.siteMetadata.siteYouTubeURL}
      siteGitHubURL={data.site.siteMetadata.siteGitHubURL}
      className={styles.footer}
    />
  </div>
);

IndexLayout.propTypes = {
  children: PropTypes.func.isRequired,
  data: PropTypes.shape({}).isRequired,
};

export default IndexLayout;

export const query = graphql`
  query IndexLayoutQuery {
    site {
      siteMetadata {
        title
        siteEmailURL
        siteFacebookURL
        siteYouTubeURL
        siteGitHubURL
      }
    }

    simonyiClubRoom: file(
      relativePath: { eq: "pictures/simonyi-club-room.jpeg" }
    ) {
      childImageSharp {
        sizes(maxWidth: 1920, maxHeight: 480, cropFocus: CENTER) {
          ...GatsbyImageSharpSizes
        }
      }
    }
  }
`;
