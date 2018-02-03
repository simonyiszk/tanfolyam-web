module.exports = {
  siteMetadata: {
    title: 'Simonyi Károly Szakkollégium',
    siteEmailURL: 'mailto:info@simonyi.bme.hu',
    siteFacebookURL: 'https://facebook.com/simonyiszk',
    siteYouTubeURL: 'https://youtube.com/user/SimonyiSzakkoli',
    siteGitHubURL: 'https://github.com/simonyiszk/tanfolyam-web',
  },
  mapping: {
    'MarkdownRemark.frontmatter.society': 'SocietiesYaml',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/src/data/`,
      },
    },
    'gatsby-transformer-remark',
    'gatsby-transformer-sharp',
    'gatsby-transformer-yaml',
    'gatsby-plugin-emotion',
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet',
  ],
};
