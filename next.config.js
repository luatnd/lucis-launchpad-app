const withAntdLess = require('next-plugin-antd-less');
const path = require('path')

/** @type {import('next').NextConfig} */
module.exports = withAntdLess({
  reactStrictMode: true,

  // webpack(config) {
  //   return config;
  // },

  images: { loader: 'custom' },

  // sassOptions: {
  //   includePaths: [path.join(__dirname, 'styles')],
  // },
})
