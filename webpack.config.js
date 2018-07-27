const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    library: 'ErrorBoundary',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'eslint-loader'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader'
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          parse: {
            html5_comments: false
          },
          comments: false,
          compress: {
            warnings: false,
            drop_console: true,
            drop_debugger: true
          }
        }
      })
    ]
  },
  plugins: [new CleanWebpackPlugin(['build'])],
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      root: ['React']
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      root: ['ReactDOM']
    },
    'pubsub-js': {
      commonjs: 'pubsub-js',
      commonjs2: 'pubsub-js',
      root: ['PubSub']
    },
    axios: {
      commonjs: 'axios',
      commonjs2: 'axios',
      root: ['axios']
    },
    'prop-types': {
      commonjs: 'prop-types',
      commonjs2: 'prop-types',
      root: ['PropTypes']
    }
  }
};
