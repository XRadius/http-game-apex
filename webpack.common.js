module.exports = {
  entry: {
    radar: './dist/radar'
  },
  output: {
    filename: '[name].min.js',
    path: `${__dirname}/public`
  }
};
