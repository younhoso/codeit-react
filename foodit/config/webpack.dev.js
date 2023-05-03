const webpack = require('webpack');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const paths = require('./paths');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  // 모드를 개발 또는 프로덕션으로 설정
  mode: 'development',
  // 소스 맵 생성 방법 제어
  devtool: 'inline-source-map',

  // devServer
  devServer: {
    historyApiFallback: true,
    contentBase: paths.build,
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },

  plugins: [
    // 핫 리로드에서 변경된 내용만 업데이트
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
			filename: 'styles/[name].[contenthash].css',
      chunkFilename: '[id].css',
		}),
  ],
})