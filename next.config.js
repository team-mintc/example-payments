/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')([
  'react-native-web',
  'nativewind',
]);

module.exports = withTM({
  webpack: config => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web',
    };
    config.resolve.extensions = [
      '.web.js',
      '.web.ts',
      '.web.tsx',
      ...config.resolve.extensions,
    ];
    return config;
  },
});
