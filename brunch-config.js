var path = require('path');

exports.config = {

  modules: {
    definition: false,
    wrapper: false
  },

  paths: {
    "public": 'www',
    "watched": ['app']
  },
 
  files: {
    templates: {
      joinTo: {
        'js/templates.js': /^app\/templates/
      }
    },
    javascripts: {
      joinTo: {
        'js/vendor.js': /^(bower_components|vendor)/,
        'js/app.js': /^app/
      },
      order: {
      }
    },
    stylesheets: {
      joinTo: {
        'css/vendor.css': /^(bower_components|vendor)/,
        'css/app.css': /^app/
      }
    }
  },

  plugins: {
    ng_annotate: {
      pattern: /^app/
    },
    postcss: {
      processors: [
        require('autoprefixer')(['last 8 versions'])
      ]
    }
  },

  server: {
    port: 4000
  },

  conventions: {
    assets: /app(\\|\/)assets(\\|\/)/
  },

  sourceMaps: false
};
