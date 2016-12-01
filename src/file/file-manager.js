/**
 * Module dependencies.
 */

const fs = require('fs');
const config = require('config');
const md5File = require('md5-file')

/**
 * Export `File Manager`.
 */

class FileManager {

    hashFile(path){
        try{
            return md5File.sync(path);
        }catch(error){
            console.log(error);
        }
    }

    writeFile(path, buffer){
        const subtitlePath = this.getSubtitlePath(path);
        console.log("Path: " + subtitlePath);
        fs.writeFile(subtitlePath, buffer.toString(), function(err) {
            return err ? 
                console.log(err) :
                console.log("The file was saved!");
        }); 
    }

    getSubtitlePath(path){
        const extension = this.getExtension(path);
        return path.split('.') 
        .reverse() 
        .join('.') 
        .replace(extension, 'srt') 
        .split('.') 
        .reverse()
        .join('.');
    }

    getExtension(path){
        return path.split('.').pop();
    }
}

module.exports = new FileManager();