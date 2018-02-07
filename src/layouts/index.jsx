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
