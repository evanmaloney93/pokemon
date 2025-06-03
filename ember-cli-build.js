'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    rootURL: '/pokemon/',

    emberData: {
      deprecations: {
        DEPRECATE_STORE_EXTENDS_EMBER_OBJECT: false,
      },
    },

    fingerprint: {
      prepend: 'https://evanmaloney93.github.io/pokemon/',
    }
  });

  return app.toTree();
};
