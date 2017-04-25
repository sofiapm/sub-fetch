
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
  test: {
    tv_shows: {
      dir: `/${__dirname}/../test/fixtures/tv-shows/`
    }
  },
  uploads_dir: `${__dirname}/../uploads/`,
  version: '/v0'
}
