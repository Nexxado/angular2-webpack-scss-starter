module.exports = {
    plugins: [
        require('autoprefixer')({
            browsers: ['> 1%']
        }),
        require('postcss-flexbugs-fixes')
    ]
};
