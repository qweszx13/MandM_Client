const CracoLessPlugin = require('craco-less');
module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 
              '@primary-color': '#2f54eb',
              '@link-color': '#262626'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};