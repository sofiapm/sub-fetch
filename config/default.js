
/**
 * Export `default` configuration.
 */

module.exports = {
  templates: {
    main_window: {
        dir: `file://${__dirname}/../templates/index.html`
    }
  },
  scripts: {
    main_window: {
        dir: `./${__dirname}/../src/index.js`
    }
  },
  version: '/v0'
};