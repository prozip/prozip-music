const withLess = require("next-with-less");
const withPlugins = require('next-compose-plugins')

const nextConfig = {

  // github pages config
  // basePath: '/prozip-music',
  // assetPrefix: '/prozip-music/',

  webpack: (config, options) => {

    // modify the `config` here

    return config;
  },
};
module.exports = withPlugins([
 
  // add a plugin with specific configuration
  [withLess, {
    lessLoaderOptions: {
      /* ... */
      lessOptions: {
        /* ... */
        modifyVars: {
          "primary-color": "#E14949",
          "font-color": "#ededed",
          "progress-bar-bg-color-dark": "#2e2e2e",
          "bg-color": "red",
          "panel-bg": "rgba(0,0,0,0.8)"

        },
      },
    },
  }],
 
], nextConfig);