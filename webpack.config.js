const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production' // 根据环境变量，判断当前是否为生产模式。
const outputType = process.env.OUTPUT_TYPE // 读取当前的输出格式（UMD/ESM）
const version = require('./package.json').version;

let env = process.env.NODE_ENV;
console.log(env);  


const config = {
    mode: isProduction ? 'production' : 'development',
    entry:// 打包输出 ESM 格式文件，最终要输出多个文件，便于实现按需加载，因此设置为多入口。
        outputType === 'esm'
            ? {
                encode: './src/utils/encode.ts',
                grid: './src/utils/grid.ts',
                url: './src/utils/url.ts',
            }
            : isProduction
                ? './src/utils/index.ts'
                : './src/index.ts',
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    // 针对不同的环境变量，执行不同的打包动作。
    output:
        outputType === 'esm'
            ? // ESM
            {
                path: path.resolve(__dirname, 'es'),
                filename: '[name].esm.js',
                library: {
                    type: 'module'
                },
                chunkFormat: 'module',
                clean: true
            }
            : // UMD
            {
                path: path.resolve(__dirname, 'lib'),
                filename: 'index.js',
                library: {
                    name: 'fonted-baseLibrary',// 指定库名称
                    type: 'umd',// 输出的模块化格式， umd 表示允许模块通过 CommonJS、AMD 或作为全局变量使用。
                    export: 'default'// 指定将入口文件的默认导出作为库暴露
                },
                globalObject: 'globalThis',// 设置全局对象为 globalThis，使库同时兼容 Node.js 与浏览器环境。
                clean: true
            },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [['@babel/preset-env']]
                        }
                    },
                    { loader: 'ts-loader' }
                ]
            }
        ]
    },
    // html-webpack-plugin 只需在开发环境时使用。
    plugins: [...(!isProduction ? [
        new HtmlWebpackPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify('development'),
            DEMO_VERSION: JSON.stringify(version),
        }),
    ] : [
        //环境变量&版本号全局化，暴露出去供其他模块使用
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify('production'),
            DEMO_VERSION: JSON.stringify(version),
        })
    ])]
}

module.exports = config