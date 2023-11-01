const path = require("path");

const mode = process.env.NODE_ENV || "development";
const devMode = mode === "development";
// const target = devMode ? "web" : "browserslist";
const devTool = devMode ? "source-map" : undefined;

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
module.exports = {
	mode,
	devtool: devTool,
	entry: ["@babel/polyfill", "./src/index.jsx"],
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].[hash].js",
		assetModuleFilename: "assets/img/[contenthash][ext]",
	},
	resolve: {
		extensions: [".js", ".json", ".wasm"],
	},
	devServer: {
		// historyApiFallback: true,
		open: true,
		// hot: true,
		port: 3000,
	},
	plugins: [
		new HTMLWebpackPlugin({ template: "./src/index.html" }),
		new MiniCssExtractPlugin({ filename: "[name].[hash].css" }),
		new CleanWebpackPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.(css|sass|scss)$/,
				use: [
					devMode ? "style-loader" : MiniCssExtractPlugin.loader,
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: [require("postcss-preset-env")],
							},
						},
					},
					"sass-loader",
				],
			},
			{
				test: /\.(jpe?g|png|svg)$/i,
				type: "asset/resource",
			},
			{
				test: /\.(js|mjs|jsx|ts|tsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"],
					},
				},
			},
		],
	},
	optimization: {
		minimizer: [
			new ImageMinimizerPlugin({
				minimizer: {
					implementation: ImageMinimizerPlugin.imageminMinify,
					options: {
						plugins: [
							["gifsicle", { interlaced: true }],
							["jpegtran", { progressive: true }],
							["optipng", { optimizationLevel: 15 }],
							["svgo", { name: "preset-default" }],
						],
					},
				},
			}),
		],
	},
};
