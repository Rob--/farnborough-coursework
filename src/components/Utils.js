import { remote } from 'electron' // eslint-disable-line
import FileUtils from './FileUtils';
import Song from './Models/Song';

const fs = require('fs');
const path = require('path');
const getMetadata = require('musicmetadata');
const getDuration = require('get-video-duration');

class Utils {
  static async getMusicFolder() {
    const directory = path.join(remote.app.getPath('music'), 'MusicPlayer');
    const files = await FileUtils.getAllFiles(directory);
    return files;
  }

  static async parseSong(path, songID = -1) {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(path);
      getMetadata(stream, async (error, data) => {
        if (error) {
          console.log(error);
          reject(error);
          return;
        }

        // Header file stores year in the format `yyyymmdd`,
        // so we convert it to `dd/mm/yyyy`
        if (data.year) {
          const year = data.year.substr(0, 4);
          const month = data.year.substr(4, 2);
          const day = data.year.substr(6, 2);
          data.year = `${day}/${month}/${year}`;
        }

        // Duration is retrieved in seconds, so we format it
        const duration = await getDuration(path);
        data.duration = duration;
        // const minutes = Math.floor(duration / 60);
        // const seconds = Math.round(duration - (minutes * 60));
        // data.duration = `${minutes}:${seconds}`;

        // Prevent memory leaks
        stream.close();

        resolve(new Song(path, data, songID));
      });
    });
  }

  static async filePathsToSongs(paths) {
    return new Promise(async (resolve) => {
      const pathMapping = async (path) => {
        const song = await this.parseSong(path);
        return song;
      };

      const songs = await Promise.all(paths.map(pathMapping));
      resolve(songs);
    });
  }
}

export default Utils;
