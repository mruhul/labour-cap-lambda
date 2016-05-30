var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

var sassLoaders = [
  'css-loader',
  'postcss-loader',
  'sass-loader?indentedSyntax=sass&includePaths[]=' + path.resolve(__dirname, './src')
];

var config = {
  entry: {
    app: ['./src/assets/js/app/index']
  },
  devtool: "source-map",
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.tsx?$/,
        exclude: /typings/,
        loader: 'ts-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader?minimize!sass-loader")
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './dist/assets'),
    publicPath: '/assets'
  },
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ],
  resolve: {
    extensions: ['', '.js', '.scss'],
    root: [path.join(__dirname, './src')]
  },
  plugins: [
      new CopyWebpackPlugin([
        {
          from: './src/*.html',
          to: path.join(__dirname, './dist'),
          flatten: true
        }
      ]),
      new ExtractTextPlugin("[name].css"),
      new webpack.optimize.UglifyJsPlugin({minimize: true}),
      new CleanWebpackPlugin(['dist', 'build'], {
        root: __dirname,
        verbose: true,
        dry: false
      })
    ]
};

module.exports = config;
