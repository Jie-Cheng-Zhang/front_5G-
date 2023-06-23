// module.exports = {
//   devServer: {
//     proxy: {
//       /* 匹配所有以'/api'开头的请求路径 */
//       '/api': {
//         target: 'http://localhost:5000',//代理目标的基础路径
//         pathRewrite: {  // 重命名
//           '^/api': ''
//         },
//         ws: true,//用于支持websocket
//         changeOrigin: true,//用于请求头中的host值
//       },
//       /* 匹配所有以'/demo'开头的请求路径 */
//       '/demo': {
//         target: 'http://localhost:5001',//代理目标的基础路径
//         pathRewrite: {  // 重命名
//           '^/demo': ''
//         },
//         // ws: true,//用于支持websocket
//         // changeOrigin: true,//用于请求头中的host值
//       }
//     }
//   }
// }
/*
changeOrigin设置为true时，服务器收到的请求中的host为：localhost:5000
changeOrigin设置为false时，服务器收到的请求中的host为：localhost:8000
changeOrigin:默认值为true
*/


// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
//   devServer: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:5000',
//         changeOrigin: true,
//         pathRewrite: {
//           '^/api': ''
//         }
//       }
//     }
//   }
// })
