module.exports = {
  entry: {
    map: './dist/map',
    radar: './dist/radar'
  },
  output: {
    filename: '[name].min.js',
    path: `${__dirname}/public`
  }
};
