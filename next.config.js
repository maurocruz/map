const path = require('path')

module.exports = {
    reactStrictMode: true,
    webpack: (config) => {
      
    config.resolve.alias = {
        ...config.resolve.alias,
        '@components': path.resolve(__dirname, './src/components'),
        '@interfaces': path.resolve(__dirname, './src/interfaces'),
        '@contexts': path.resolve(__dirname, './src/contexts'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@libs': path.resolve(__dirname, './src/libs'),
    }

    return config
    },
  }