	var path = require('path');
var webpack = require('webpack');
 
module.exports = {
  entry: [
    './components/'
  ],
  devtool: 'eval-source-map',
  output: {
    path: __dirname,
    filename: 'appIndex.js',
    publicPath: '/js/'
  },
module: {
  loaders: [{
    test: /\.js$/,
    loaders: ['babel', ],
    include: path.join(__dirname, 'components')
  },
  { test: /\.css$/,
   loader: "style-loader!css-loader" }]
}
};