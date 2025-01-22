const webpack = require('webpack');

module.exports = function override(config) {
    config.resolve = {
        ...config.resolve,
        fallback: {
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
            stream: require.resolve('stream-browserify'),
            zlib: require.resolve('browserify-zlib'),
            util: require.resolve('util/'),
            url: require.resolve('url/'),
            assert: require.resolve('assert/'),
            process: require.resolve('process/browser.js'),
        },
        extensions: ['.js', '.jsx', '.json'],
    };
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
    ]);
    return config;
};
