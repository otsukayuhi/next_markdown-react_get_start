const fs = require('fs')
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
