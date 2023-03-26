const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/myH5', // build
  devServer: {
    host: "0.0.0.0", // Specify a host to use.
    port: 8888, // Specify a port number to listen for requests on.
    https: true, // By default, dev-server will be served over HTTP.
    open: true, // Tells dev-server to open the browser after server had been started. Set it to true to open your default browser.
    proxy: {
      '/API': {
        target: 'https://zs.891156.vip/', // 预生产
        ws: true,
        changeOrigin: true,
      }
    }
  }
  // devServer: {
  //   port: 80,
  //   hot: true,
  //   disableHostCheck: true,
  //   proxy: {
  //     // 配置跨域
  //     '/API': {
  //       target: 'https://zs.891156.vip/', // 预生产
  //       ws: true,
  //       changeOrigin: true,
  //       logLevel: 'debug'
  //     }
  //   }
  // }
})
