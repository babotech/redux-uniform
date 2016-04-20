'use strict';

var webpack = require('webpack');
var env = process.env.NODE_ENV;

var reactExternal = {
    root: 'React',
    commonjs2: 'react',
    commonjs: 'react',
    amd: 'react'
};

var reduxStateExternal = {
    root: 'ReduxState',
    commonjs2: 'redux-state',
    commonjs: 'redux-state',
    amd: 'redux-state'
};

var config = {
    externals: {
        'react': reactExternal,
        'redux-state': reduxStateExternal
    },
    module: {
        loaders: [
            { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ }
        ]
    },
    output: {
        library: 'ReduxUniform',
        libraryTarget: 'umd'
    },
    plugins: [
        {
            apply: function apply(compiler) {
                compiler.parser.plugin('expression global', function expressionGlobalPlugin() {
                    this.state.module.addVariable('global', "(function() { return this; }()) || Function('return this')()")
                    return false
                })
            }
        },
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env)
        })
    ]
};

if (env === 'production') {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                screw_ie8: true,
                warnings: false
            }
        })
    )
};

module.exports = config;