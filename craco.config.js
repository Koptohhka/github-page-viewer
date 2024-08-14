const path = require('path');

module.exports = {
    webpack: {
        alias: {
            '@components': path.resolve(__dirname, './src/components'),
            '@services': path.resolve(__dirname, './src/services'),
            '@store': path.resolve(__dirname, './src/store'),
            '@types': path.resolve(__dirname, './src/types'),
        },
    },
};