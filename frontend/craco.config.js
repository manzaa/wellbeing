module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        webpackConfig.module.rules.push({
          test: /ffmpeg-core\.js$/,
          use: 'file-loader',
        });
        return webpackConfig;
      },
    },
  };
  