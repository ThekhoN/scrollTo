module.exports = {
  entry: './js/main.js',
  output: {
    filename: './js/bundle.js'
  },
  watch: true,
  module: {
      loaders: [
          {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: 'babel',
              query: {
                  presets: ['es2015']
              }
          },
          {
            test:/\.css$/,
            excluse: /node_modules/,
            loader: 'style!css'
          }
      ],
  }
};
