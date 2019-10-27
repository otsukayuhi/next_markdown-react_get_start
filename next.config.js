const withCSS = require("@zeit/next-css");
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

module.exports = withCSS({
  webpack: config => {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader"
    });
    return config;
  },
  async exportPathMap(defaultPathMap) {
    const pages = {
      '/': { page: '/' },
      '/about': { page: '/about' },
      ...getPathsForMarkdown()
    };
    console.log(pages);
    return {
      ...defaultPathMap,
      ...pages
    };
  }
});