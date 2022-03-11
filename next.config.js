const withAntdLess = require("next-plugin-antd-less");
const path = require("path");

/** @type {import('next').NextConfig} */
module.exports = withAntdLess({
  reactStrictMode: true,

  /**
   * From Static structure: /about.html
   * To Static structure: /about/index.html
   *
   * But this also make all client url end with a `/`, so we will turn it off
   * https://nextjs.org/docs/api-reference/next.config.js/exportPathMap#adding-a-trailing-slash
   */
  // trailingSlash: false,

  // webpack(config) {
  //   return config;
  // },

  images: { loader: "custom" },

  // sassOptions: {
  //   includePaths: [path.join(__dirname, 'styles')],
  // },

  /**
   * Custom webpack config
   * https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
   */
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {

    /**
     * Inject git commit id into debug page
     */
    const git_commit_id = require('child_process')
      .execSync('git rev-parse --short HEAD')
      .toString().trim();
    const stringReplaceLoaderRule = {
      test: /pages\/lucis-debug\/index\.tsx$/,
      loader: 'string-replace-loader',
      options: {
        search: 'LUCIS_VERSION_COMMIT_ID',
        replace: git_commit_id,
      },
    };
    const rules = config.module.rules;
    rules.push(stringReplaceLoaderRule)

    // Show testnet text on the header
    const git_branch = require('child_process')
      .execSync('cat .git/HEAD')
      // .execSync('git branch --show-current')
      .toString().trim();
    rules.push({
      test: /components\/Header\.tsx$/,
      loader: 'string-replace-loader',
      options: {
        search: '"IS_TESTNET"',
        replace: (git_branch === 'ref: refs/heads/trial').toString(),
      },
    })
    rules.push({
      test: /components\/Menu\/MenuMobile\.tsx$/,
      loader: 'string-replace-loader',
      options: {
        search: '"IS_TESTNET"',
        replace: (git_branch === 'ref: refs/heads/trial').toString(),
      },
    })



    // Important: return the modified config
    return config
  },
});
