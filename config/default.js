
/**
 * Export `default` configuration.
 */

module.exports = {
  assets: {
    bar_icon: {
        dir: `file://${__dirname}/../assets/logo/logo.icns`
    }
  },
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
  open_subtitles: {
      user_agent: 'OSTestUserAgentTemp'
  },
  version: '/v0'
};