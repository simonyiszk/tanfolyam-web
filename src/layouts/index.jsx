import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import React from 'react';
import { css, injectGlobal } from 'react-emotion';
import Helmet from 'react-helmet';
import FaEnvelope from 'react-icons/lib/fa/envelope';
import FaFacebookOfficial from 'react-icons/lib/fa/facebook-official';
import FaGitHub from 'react-icons/lib/fa/github';
import FaYouTubePlay from 'react-icons/lib/fa/youtube-play';

// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
import normalizeCSS from '!raw-loader!normalize.css';

import SimonyiLightLogoSrc from '../../static/assets/logos/simonyi-light.svg';
import Container from '../components/Container';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  ${normalizeCSS}

  body {
    box-sizing: border-box;
    font-family: Montserrat, sans-serif;
    overflow-x: hidden;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  a {
    color: #0288d1;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }

    header &, footer & {
      color: inherit;
    }
  }

  p {
    line-height: 1.5;
  }

  fieldset {
    padding: 0;
    border: 0;
    margin: 0 0 1.33em 0;

    legend {
      font-weight: bold;
      margin: 1.33em 0;
    }
  }
`;

const IndexLayout = ({ children, data }) => (
  <div
    className={css`
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    `}
  >
    <Helmet
      titleTemplate={`%s | ${data.site.siteMetadata.title}`}
      defaultTitle={data.site.siteMetadata.title}
    >
      <html lang="hu" />

      <link
        href="https://fonts.googleapis.com/css?family=Montserrat"
        rel="stylesheet"
      />

      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Helmet>

    <header>
      {/* Hero image with branding */}
      <div
        className={css`
          position: relative;
        `}
      >
        <Img
          sizes={data.simonyiClubRoom.childImageSharp.sizes}
          className={css`
            filter: brightness(0.5);
          `}
        />
        <img
          src={SimonyiLightLogoSrc}
          alt={data.site.siteMetadata.title}
          className={css`
            position: absolute;
            width: 50%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          `}
        />
      </div>
    </header>

    <main
      className={css`
        flex: 1;
        margin-bottom: 1em;
      `}
    >
      {children()}
    </main>

    <footer
      className={css`
        background: #263238;
        color: white;
        text-align: center;
        font-size: 2em;
        padding: 0.5em 0;
      `}
    >
      <Container>
        <div
          className={css`
            display: flex;
            justify-content: space-between;
            margin: 0 auto;
            max-width: 12em;

            a {
              margin: 0.5em;
            }
          `}
        >
          <a
            href={data.site.siteMetadata.siteFacebookURL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookOfficial />
          </a>

          <a
            href={data.site.siteMetadata.siteYouTubeURL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYouTubePlay />
          </a>

          <a
            href={data.site.siteMetadata.siteGitHubURL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGitHub />
          </a>

          <a href={data.site.siteMetadata.siteEmailURL}>
            <FaEnvelope />
          </a>
        </div>
      </Container>
    </footer>
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
      relativePath: { eq: "assets/pictures/simonyi-club-room.jpeg" }
    ) {
      childImageSharp {
        sizes(maxWidth: 1920, maxHeight: 480, cropFocus: CENTER) {
          ...GatsbyImageSharpSizes
        }
      }
    }
  }
`;
