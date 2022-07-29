module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    devServer: {
      port: 8989,
      open: true,
      hot: true,
      disableHostCheck: true,
      overlay: {
        warnings: false,
        errors: true
      }
    },
}