module.exports = {
    webpack: {
      configure: {
        resolve: {
          fallback: {
            crypto: require.resolve('crypto-browserify'),
            os: require.resolve('os-browserify/browser'),
            util: require.resolve('util/'),
          },
        },
      },
    },
  };
  