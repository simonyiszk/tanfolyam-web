exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type IndexYML implements Node {
      frontmatter: Frontmatter
    }
    type Frontmatter {
      occasions: [MarkdownRemarkFrontmatterOccasions]
    }
    type MarkdownRemarkFrontmatterOccasions {
      dateText: String
    }
  `;
  createTypes(typeDefs);
};
