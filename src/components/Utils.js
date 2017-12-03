import { remote } from 'electron' // eslint-disable-line
import FileUtils from './FileUtils';
const path = require('path');

class Utils {
  static async getMusicFolder() {
    const directory = path.join(remote.app.getPath('music'), 'MusicPlayer');
    const files = await FileUtils.getAllFiles(directory);
    return files;
  }
}

export default Utils;
