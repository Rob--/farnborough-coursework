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

  static parseSong(path, songID = -1) {
    // The songID has a default parameter of one

    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(path);
      getMetadata(stream, async (error, data) => {
        if (error) {
          reject(error);
          return;
        }

        // Duration is retrieved in seconds, so we format it
        data.duration = await getDuration(path);

        // Prevent memory leaks
        stream.close();

        resolve(new Song(path, data, songID));
      });
    });
  }

  static formatDuration(duration) {
    let minutes = Math.floor(duration / 60);
    if (minutes < 10) minutes = `0${minutes}`;

    let seconds = Math.round(duration % 60);
    if (seconds < 10) seconds = `0${seconds}`;

    return `${minutes}:${seconds}`;
  }

  static async filePathsToSongs(paths) {
    return Promise.all(paths.map(this.parseSong));
  }
}

export default Utils;
