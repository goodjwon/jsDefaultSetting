const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, options) => {
  const config = {
    entry: {
      app: ['./src/script/app.js']
    },
    output: {
      filename: './script/[name].js',
      path: path.resolve(__dirname, 'dist')
    },
    optimization: { //node_modules 별도 패키징.
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    }
  }

  if(options.mode === 'development') {
    config.plugins = [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        title: 'Development',
        template: './src/public/index.html',
        filename: './index.html',
        showErrors: true
      })
    ];

    config.devtool = 'inline-source-map';

    config.devServer = {
      hot: true,
      host: '127.0.0.1',
      contentBase: path.resolve(__dirname, 'dist'),
      stats: {
        color: true
      }
    };
  } else {
    config.plugins = [
      new CleanWebpackPlugin(['dist'])
    ];
  }

  return config;
}