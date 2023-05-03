const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const paths = require('./paths');

module.exports = {
	resolve: {
		extensions: ['.js', '.jsx', '.css', '.scss'],
		alias: {
		  '@': paths.src,
		},
	},
  entry: {
		main: '/src/index.js',
	},
  module: {
		rules: [
			{ // js, jsx loader
        test: /\.(js|jsx)$/,
        exclude: /nodeModules/,
        use: "babel-loader",
      },
			{ // images loader
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'assets/images/[name][ext]',
				},
			},
			{ // fonts loader
				test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/i,
				type: 'asset/resource',
				generator: {
					filename: 'assets/fonts/[name][ext]',
				},
			},
			{  // css 또는 scss loader
				test: /\.s[ac]ss|css$/i,
				exclude: /node_modules/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
			},
		]
	},
  plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			minify: process.env.NODE_ENV === 'production' ? {
				collapseWhitespace: true,
				removeComments: true,
			} : false
		}),
		new CleanWebpackPlugin()
	],
  output: {
		filename: 'assets/[name].min.js',
		path: paths.build
	},
}