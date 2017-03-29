/* eslint-disable node/no-unpublished-require */

const p = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WebpackBuildNotifierPlugin = require('webpack-build-notifier')

module.exports = {
  name: 'qwForm',
  entry: {
    'qwForm': './src/index.js',
  },
  output: {
    path: p.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/assets/',
  },
  stats: { children: false }, // extract-text-webpack-plugin - disable logs
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(\/node_modules\/|\/src\/components\/)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['es2015', { 'modules': false }],
                'stage-0',
              ],
            },
          },
        ],
      }, {
        test: /\.js$/,
        exclude: /\/node_modules\//,
        include: /\/src\/components\//,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                'react',
                ['es2015', { 'modules': false }],
                'stage-0',
              ],
            },
          },
        ],
      }, {
        // локально, sourceMap, включая postcss
        test: /\.css$/,
        exclude: /(\/node_modules\/|\.global\.)/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?modules&importLoaders=2&localIdentName=[name]__[local]--[hash:base64:5]&sourceMap', 'postcss-loader', 'resolve-url-loader'],
        }),
      }, {
        // глобально, sourceMap, включая postcss
        test: /\.css$/,
        include: /\.global\./,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?modules&importLoaders=2&localIdentName=[local]&sourceMap', 'postcss-loader', 'resolve-url-loader'],
        }),
      }, {
        // глобально, без sourceMap, без postcss
        test: /\.css$/,
        include: /\/node_modules\//,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?modules&importLoaders=1&localIdentName=[local]', 'resolve-url-loader'],
        }),
      }, {
        // локально, sourceMap, включая postcss
        test: /\.scss$/,
        exclude: /(\/node_modules\/|\.global\.)/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?modules&importLoaders=2&localIdentName=[name]__[local]--[hash:base64:5]&sourceMap', 'postcss-loader', 'resolve-url-loader', {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }
          }],
        }),
      }, {
        // глобально, sourceMap, включая postcss
        test: /\.scss$/,
        include: /(\/node_modules\/|\.global\.)/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?modules&importLoaders=2&localIdentName=[local]&sourceMap', 'postcss-loader', 'resolve-url-loader', {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }
          }],
        }),
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new ExtractTextPlugin('qwForm.css'),
    new WebpackBuildNotifierPlugin({
      title: 'qwForm Webpack Build',
    }),
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: p.join(__dirname, 'public'),
    port: 3000,
  },
  resolve: {
    alias: {
      'qwForm': p.resolve(__dirname, 'src'),
    },
  },
}
