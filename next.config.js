const fs = require('fs')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const markdownFolder = 'data/markdown'

const getPathsForMarkdown = () =>
  /**
   * acc: accumulator（アキュムレーター）
   * https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
   *
   * markdownファイルの数だけ、exportPathMap用のオブジェクトを作成しいている
   * reduce() 難しい＼(^o^)／
   */
  fs.readdirSync(markdownFolder).reduce((acc, fileName) => {
    const trimmedName = fileName.substring(0, fileName.length - 3)
    return Object.assign(acc, {
      [`/docs/${trimmedName}`]: {
        page: '/docs/[id]',
        query: {
          id: trimmedName
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

    if (config.resolve.plugins) {
      config.resolve.plugins.push(new TsconfigPathsPlugin())
    } else {
      config.resolve.plugins = [new TsconfigPathsPlugin()]
    }

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
