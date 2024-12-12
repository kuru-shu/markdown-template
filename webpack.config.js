const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
  entry: {
    background: './src/background.js',
    content: './src/content.js',
    popup: './src/popup.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    environment: {
    arrowFunction: false, // 古いブラウザ対応が必要な場合
    const: false,         // const を使用しない
    dynamicImport: false, // 動的 import を禁止
  },
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/manifest.json', to: '.' },
        { from: 'src/popup.html', to: '.' },
        { from: 'src/styles.css', to: '.' },
        { from: 'src/hot-reload.js', to: '.' }, // Hot Reload スクリプトをコピー
      ],
    }),
    new LiveReloadPlugin({
      port: 35730,
    }), // Livereload を有効化
  ],
  mode: 'development',
  watch: true, // ファイルの変更を監視
  devtool: 'cheap-module-source-map',
};
