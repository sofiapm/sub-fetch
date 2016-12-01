/**
 * Module dependencies.
 */

const openSubtitles = require('opensubtitles-api');

/**
 * Export `AbstractManager`.
 */

class OpenSubtitlesManager {

    ping(){
        console.log('Estou no opensubtitles');
    }
}

module.exports = new OpenSubtitlesManager();