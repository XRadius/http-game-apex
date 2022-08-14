module.exports = {
  entry: {
    app: './dist/app'
  },
  output: {
    filename: '[name].min.js',
    path: `${__dirname}/docs`
  },
  resolve: {
    alias: {
      'lib': `${__dirname}/dist/lib`,
      'ui': `${__dirname}/dist/ui`
    }
  }
};
