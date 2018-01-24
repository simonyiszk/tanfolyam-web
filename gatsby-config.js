module.exports = {
  siteMetadata: {
    title: 'Simonyi Károly Szakkollégium',
  },
  plugins: [
    'gatsby-plugin-emotion',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/data/`,
      },
    },
    'gatsby-transformer-remark',
  ],
};
