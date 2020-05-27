/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `Legion Ops`,
    description: `Tournament and League play organizer for Star Wars Legion.`,
    author: `Steve Good`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Legion Ops`,
        short_name: `Legion Ops`,
        start_url: `/`,
        background_color: `#303030`,
        theme_color: `#303030`,
        display: `standalone`,
        icon: `src/images/icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-material-ui`,
  ],
}
