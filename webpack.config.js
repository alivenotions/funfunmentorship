const webpack = require('webpack')
const path = require('path')
const OfflinePlugin = require('offline-plugin')
const OUT_DIR = path.resolve(__dirname, './dist')
const PORT = process.env.PORT || 9876
const testExitCode = process.env.TRAVIS_TEST_RESULT

module.exports = {
  devtool: 'source-map',
  entry: {
    'app': [
      'babel-polyfill',
      'react-hot-loader/patch',
      './src/index'
    ]
  },
  output: {
    path: OUT_DIR,
    publicPath: !!testExitCode ? '/funfunmentorship/' : '/',
    filename: '[name].js'
  },
  devServer: {
    port: PORT,
    publicPath: '/',
    contentBase: OUT_DIR,
    disableHostCheck: true
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: 'style-loader',
            options: { hmr: false }
          },
          { loader: 'css-loader',
            query: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [
                require('autoprefixer')()
              ]
            }
          },
          { loader: 'less-loader', options: {
            sourceMap: true
          }},
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new OfflinePlugin({
      externals: [
        'https://ffforumautomator.herokuapp.com/hackable-data',
        'https://discourse-cdn-sjc1.com/standard6/user_avatar/www.funfunforum.com/'
      ]
    })

  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
}
