const fs = require('fs')
const blogPostsFolder = 'src/markdown'

const getPathsForMarkdown = () =>
  fs.readdirSync(blogPostsFolder).reduce((acc, fileName) => {
    const trimmedName = fileName.substring(0, fileName.length - 3)
    return Object.assign(acc, {
      [`/docs/${trimmedName}`]: {
        page: '/docs/[md]',
        query: {
          md: trimmedName
        }
      }
    })
  }, {})

module.exports = {
  webpack: config => {
    config.module.rules.push({
      test: [/\.md$/, /\.css$/],
      use: 'raw-loader'
    })
    return config
  },
  async exportPathMap(defaultPathMap) {
    const pages = {
      '/': { page: '/' },
      ...getPathsForMarkdown()
    }
    return {
      ...defaultPathMap,
      ...pages
    }
  }
}
