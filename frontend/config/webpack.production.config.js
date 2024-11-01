const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const basicConfig = require("./webpack.config");
const webpack = require("webpack");
const dotenv = require("dotenv");

dotenv.config();

const config = {
    mode: "production",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    },
                },
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                mode: "local",
                                localIdentName: "[name]__[local]--[hash:base64:5]",
                                namedExport: false,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(ico|png|jpg|jpeg|svg)$/i,
                type: "asset/resource",
                generator: {
                    filename: "assets/[name][ext]",
                },
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
        }),
        new webpack.DefinePlugin({
            "process.env": {
                MAIN_TEST_ID: JSON.stringify(process.env.MAIN_TEST_ID),
                REACT_APP_API_URL: JSON.stringify(process.env.REACT_APP_API_URL),
            },
        }),
    ],
};

module.exports = merge(basicConfig, config);
