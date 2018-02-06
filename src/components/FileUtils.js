const bluebird = require('bluebird');
const fs = bluebird.promisifyAll(require('fs'));
const path = require('path');

class FileUtils {
  /**
   * Reads all files in a given directory recursively.
   * @param directory - directory to search
   * @param trackedFiles - (can be ignored)
   * @returns {Array} path names
   */
  static async getAllFiles(directory) {
    const trackedFiles = [];

    const getFiles = async (parent) => {
      // Read all the file names inside the directory (including folders)
      const files = await fs.readdirAsync(parent);
      const mappings = files.map(async (file) => {
        // Get stats about the file (to determine if it's a folder);
        const stat = await fs.statAsync(path.join(parent, file));

        if (stat.isDirectory()) {
          // If it's a folder, recursively search
          await getFiles(path.join(parent, file));
        } else {
          trackedFiles.push(path.join(parent, file));
        }
      });

      await Promise.all(mappings);
    };

    await getFiles(directory);
    return trackedFiles;
  }
}

export default FileUtils;
