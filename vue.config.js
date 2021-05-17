module.exports = {
    devServer: {
        proxy: {
          '/apiPath': {
            target: 'http://10.10.254.138:7532',//10.10.254.243:7532  138
            changeOrigin: true,
            ws: true,
            pathRewrite:{'^/apiPath' : ''}
          },
        },
        open: true,
      }
}