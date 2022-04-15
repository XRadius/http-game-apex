const common = require('./webpack.common');

module.exports = Object.assign(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    client: false,
    port: 3000,
    static: {directory: common.output.path}
  },
  module: {
    rules: [{
      test: /\.js$/,
      enforce: 'pre',
      use: ['source-map-loader']
    }]
  }
});
