import Database from '../Database';
import Playlist from '../Models/Playlist';
import Utils from '../Utils';

function getPlaylist(name) {
  return new Promise((resolve, reject) => {
    Database.get('SELECT * FROM Playlists WHERE PlaylistName = ?', name, (error, row) => {
      if (!row || !row.PlaylistID || !row.PlaylistName) {
        reject();
        return;
      }

      const playlist = new Playlist(row.PlaylistID, row.PlaylistName);
      resolve(playlist);
    });
  });
}

function getPlaylists() {
  const playlists = {};

  const extractor = async (row) => {
    const song = await Utils.parseSong(row.FilePath, row.SongID);
    if (playlists[row.PlaylistName]) {
      playlists[row.PlaylistName].push(song);
    } else {
      playlists[row.PlaylistName] = [song];
    }
  };

  return new Promise((resolve) => {
    const query = `SELECT * FROM Songs
    INNER JOIN PlaylistSongs ON PlaylistSongs.SongID = Songs.SongID
    INNER JOIN Playlists ON Playlists.PlaylistID = PlaylistSongs.PlaylistID`;

    Database.all(query, async (error, rows) => {
      await Promise.all(rows.map(extractor));
      resolve(playlists);
    });
  });
}

async function doesPlaylistExist(name) {
  try {
    await getPlaylist(name);
  } catch (e) {
    return false;
  }

  return true;
}

function createPlaylist(name, songs) {
  return new Promise(async (resolve, reject) => {
    const exists = await doesPlaylistExist(name);

    if (exists) {
      // Reject the promise if the playlist already exists.
      reject(`Playlist "${name}" already exists.`);
      return;
    }

    // This function will create our intermediary table row.
    const insert = async (playlistID, songID, index) => {
      Database.run('INSERT INTO PlaylistSongs VALUES (?, ?)', playlistID, songID);
      await new Promise(resolve => setTimeout(resolve, 500 * index));
    };

    // Creates a statement that will instantly be run.
    const playlist = Database.prepare('INSERT INTO Playlists VALUES (null, ?)').run(name, () => {
      // The `run` function will return the result of executing this INSERT statement into the
      // `playlist` variable which will contain a property named `lastID` which is the ID of the
      // newly inserted row. The `lastID` property is therefore the `PlaylistID` column as that is
      // the only auto-incrementing column in the table.
      const playlistID = playlist.lastID;

      // For each song, get the ID of the song and insert a row into the intermediary table.
      songs.forEach(({ id }, index) => insert(playlistID, id, index));
      resolve();
    });
  });
}

export default {
  getPlaylist, getPlaylists, doesPlaylistExist, createPlaylist,
};
