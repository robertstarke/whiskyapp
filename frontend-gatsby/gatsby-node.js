const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const WhiskyPage = path.resolve("./src/templates/Whisky.js");

  const result = await graphql(`
    {
      strapi {
        whiskies {
          abv
          id
          name
          age
          rating
          taste_notes {
            id
            name
          }
          characteristics {
            id
            name
          }
        }
      }
    }
  `);

  result.data.strapi.whiskies.forEach((whisky) => {
    createPage({
      path: `/whisky/${whisky.id}`,
      component: WhiskyPage,
      context: {
        whisky: whisky,
      },
    });
  });
};
