const withAntdLess = require("next-plugin-antd-less");
const path = require("path");

/** @type {import('next').NextConfig} */
module.exports = withAntdLess({
  reactStrictMode: true,

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


    // Important: return the modified config
    return config
  },
});
