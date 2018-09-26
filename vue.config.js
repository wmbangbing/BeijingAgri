const path = require('path')

function resolve(dir) {
    return path.join(__dirname, '.', dir)
}

module.exports = {
    baseUrl: './',
    chainWebpack: config => {
        // const svgRule = config.module.rule('svg')
        // svgRule.uses.clear()
        // svgRule
        //     .use('svg-sprite-loader')
        //         .loader('svg-sprite-loader')
        //         .options({
        //             symbolId: 'icon-[name]'
        //         })

        config.module
        .rule('svg')
        .exclude
        .add(resolve('src/icons'))
        .end()
        .use('file-loader')
        .loader('file-loader')
        .options({
            name: 'img/[name].[hash:8].[ext]'
        })

        config.module
        .rule('svg-icon')
        .include
        .add(resolve('src/icons/svg'))
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
            symbolId: 'icon-[name]'
        })
    },

    lintOnSave: undefined
}