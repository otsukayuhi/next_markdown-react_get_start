const fs = require('fs');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const markdownFolder = 'data/markdown';

const production = process.env.NODE_ENV === 'production';

const getPathsForMarkdown = () =>
  /**
   * acc: accumulator（アキュムレーター）
   * https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
   *
   * markdownファイルの数だけ、exportPathMap用のオブジェクトを作成しいている
   * reduce() 難しい＼(^o^)／
   */
  fs.readdirSync(markdownFolder).reduce((acc, fileName) => {
    const trimmedName = fileName.substring(0, fileName.length - 3);
    return Object.assign(acc, {
      [`/docs/${trimmedName}`]: {
        page: '/docs/[id]',
        query: {
          id: trimmedName
        }
      }
    });
  }, {});

/**
 * npm run export 時のみ実行
 * now 使ってるので不要かも
 */
const exportPathMap = production
  ? async function(defaultPathMap) {
      const pages = {
        '/': { page: '/' },
        ...getPathsForMarkdown()
      };
      return {
        ...defaultPathMap,
        ...pages
      };
    }
  : null;

module.exports = {
  webpack: config => {
    config.module.rules.push({
      test: [/\.md$/, /\.css$/],
      use: 'raw-loader'
    });

    /**
     * TypeScriptでパスを解決するやつ
     * https://github.com/zeit/next.js/issues/7935
     */
    if (config.resolve.plugins) {
      config.resolve.plugins.push(new TsconfigPathsPlugin());
    } else {
      config.resolve.plugins = [new TsconfigPathsPlugin()];
    }

    return config;
  },
  exportPathMap
};
