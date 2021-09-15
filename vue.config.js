module.exports = {
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true,
            },
        },
    },
    devServer: {
		proxy: {
			'/api': {
				// 代理api
				target: 'https://dev.qtscm.net', // 代理接口(注意只要域名就够了)
				changeOrigin: true,
				pathRewrite:{'^/api' : ''},
				/* bypass: function(req, res) {
					if (req.headers.accept.indexOf('html') !== -1){
						return '/index.html';
					}else if (process.env.MOCK !== "none"){
						const name = req.path
							.split("/api/")[1]
							.split("/")
							.join("_");
						const mock = require(`./mock/${name}`);
						const result = mock(req.method);
						delete require.cache[require.resolve(`./mock/${name}`)];
						return res.send(result);
					}
				} */
			}
		}
	}
};