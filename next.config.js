const path = require('path')

module.exports = {
    reactStrictMode: true,
    webpack: (config) => {
      
    config.resolve.alias = {
        ...config.resolve.alias,
        '@components': path.resolve(__dirname, './src/components'),
        '@interfaces': path.resolve(__dirname, './src/interfaces'),
        '@contexts': path.resolve(__dirname, './src/contexts'),
    }

    return config
    },
  }