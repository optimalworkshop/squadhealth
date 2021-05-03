const { environment } = require('@rails/webpacker');

environment.loaders.append('audio', {
  test: /\.(mp3|wav)$/,
  use: [
    {
      loader: 'file-loader',
      options: {},
    },
  ],
});

// // Get the actual sass-loader config
// const sassLoader = environment.loaders.get('sass');
// const sassLoaderConfig = sassLoader.use.find(function (element) {
//   return element.loader == 'sass-loader';
// });

// // Use Dart-implementation of Sass (default is node-sass)
// const options = sassLoaderConfig.options;
// options.implementation = require('sass');

// const cssLoaderConfig = sassLoader.use.find(function (element) {
//   return element.loader == 'css-loader';
// });

// console.log(cssLoaderConfig.options);

module.exports = environment;
