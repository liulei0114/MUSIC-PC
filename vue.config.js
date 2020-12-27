const path = require('path')

module.exports = {
  // 部署应用包时的基本 URL,用法和 webpack 本身的 output.publicPath 一致
  publicPath: './',
  // 输出文件目录
  outputDir: 'dist',
  //静态资源目录(js、css、img、fonts)，相对outputDir的目录(默认'')
  assetsDir: '',
  // 以多页模式构建应用程序。
  pages: undefined,
  //指定生成index.html的输出路径(相对outputDir)也可以是绝对路径        
  indexPath: 'index.html',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: false,
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // 生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)
  integrity: false,


  // webpack相关配置
  chainWebpack: (config) => {
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@', path.resolve(__dirname, './src'))
      .set('assets', path.resolve(__dirname, './public/assets'))

    const svgRule = config.module.rule('svg')
    // 清除已有的所有 loader,如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear()
    // 添加要替换的 loader
    svgRule.use('svg-sprite-loader').loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'prod') {
      // 生产环境
      config.mode = 'production'
    } else {
      // 开发环境
      config.mode = 'development'
    }
  },
  // css相关配置
  css: {
    // 是否分离css（插件ExtractTextPlugin）
    extract: false,
    // 是否开启 CSS source maps
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 是否启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  // 是否使用 thread-loader
  parallel: require('os').cpus().length > 1,
  // PWA 插件相关配置
  pwa: {},
  // webpack-dev-server 相关配置
  // 代理只适用于本地开发，生产一般使用nginx或者后端解决
  devServer: {
    open: false,
    host: 'localhost',
    port: 9999,
    https: false,
    hotOnly: false,
    // http 代理配置
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          //重写接口,完整接口就是target
          '^/api': ''
        }
      }
    },
    before: (app) => { }
  },

  // 第三方插件配置
  pluginOptions: {

  }
}