const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
// TODO: Add and configure workbox plugins for a service worker and manifest file.
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE',
      }),
      
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),

      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        ios: {
          'apple-touch-icon': 'JATE',
          'apple-mobile-web-app-capable': true
        },
        name: 'Text-Editor-App',
        short_name: 'TextEditor',
        description: 'Take notes with Javascript syntax highlighting!',
        background_color: '#31a9e1',
        theme_color: '#31a9e1',
        start_url: './',
        publicPath: './',
        crossorigin: 'use-credentials',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 144, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
            purpose: 'any'
          },
        ],
      })
    ],
// TODO: Add CSS loaders and babel to webpack.
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};