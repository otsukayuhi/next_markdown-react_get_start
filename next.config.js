const fs = require("fs");
const blogPostsFolder = "./markdown";

const getPathsForMarkdown = () =>
  fs.readdirSync(blogPostsFolder).reduce((acc, fileName) => {
    const trimmedName = fileName.substring(0, fileName.length - 3);
    return Object.assign(acc, {
      [`/docs/${trimmedName}`]: {
        page: "/docs/[md]",
        query: {
          md: trimmedName
        }
      }
    });
  }, {});

module.exports = {
  webpack: config => {
    config.module.rules.push({
      test: /\.md$/,
      use: "frontmatter-markdown-loader"
    });
    return config;
  },
  async exportPathMap(defaultPathMap) {
    return {
      ...defaultPathMap,
      ...getPathsForMarkdown()
    };
  }
};