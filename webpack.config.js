const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
  entry: {
    background: './background.js',
    content: './content.js',
    main: './src/main.jsx', // Reactエントリーポイントに変更
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // JSX対応
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react', // React対応
            ],
          },
        },
      },
      {
        // Tailwind (CSS) 用
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // 必要に応じてモジュール化など
            },
          },
          'postcss-loader', // Tailwind / autoprefixer を効かせる
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // importで拡張子省略時に.js, .jsxを解決
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'manifest.json', to: '.' },
        { from: 'main.html', to: '.' }, // popup.html相当
        { from: 'hot-reload.js', to: '.' },
      ],
    }),
    new LiveReloadPlugin({
      port: 35730,
    }),
  ],
  mode: 'development',
  watch: true,
  devtool: 'cheap-module-source-map',
};
