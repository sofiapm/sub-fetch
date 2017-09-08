
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
    },
    settings_window: {
      dir: `file://${__dirname}/../templates/settings.html`
    },
    about_window: {
      dir: `file://${__dirname}/../templates/about.html`
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
    },
    user_data: {
      dir: `/${__dirname}/../test/fixtures/user-data/`
    }
  },
  uploads_dir: `${__dirname}/../uploads/`,
  main_dir: `${__dirname}/../bin/main.js`,
  version: '/v0'
}
