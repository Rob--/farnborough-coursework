import Utils from '../Utils';
import Database from '../Database';

function getSongs() {
  return new Promise((resolve, reject) => {
    Database.all('SELECT s.SongID, s.Name, s.Duration, s.FilePath, g.genre FROM Songs s INNER JOIN Genres g ON g.GenreID = s.Genre', async (error, rows) => {
      if (error) {
        reject(error);
        return;
      }

      const parseSongPromises =
        rows.map(({ FilePath, SongID }) => Utils.parseSong(FilePath, SongID));

      const songs = await Promise.all(parseSongPromises);
      resolve(songs);
    });
  });
}

function saveSongs(songs) {
  // Generator function, returns all the songs
  function* songCollection(songs) {
    for (let i = 0; i < songs.length; i += 1) {
      yield songs[i];
    }
  }

  return new Promise(async (resolve) => {
    // Database.run('DELETE FROM Songs');
    const existingSongs = await getSongs();

    const statement = Database.prepare('INSERT INTO Songs VALUES (null, ?, ?, ?, ?)');

    // Create the generator given the songs we need to save
    const generator = songCollection(songs);

    // We use the generator to save the songs one by one,
    // if we don't do this and we are trying to save multiple
    // songs with the same genre that does not yet exist within
    // the database, it won't create duplicate entries
    const save = async () => {
      const song = generator.next();

      if (song.done) {
        resolve();
        return;
      }

      const exists = existingSongs.some(s => s.toString() === song.value.toString());

      if (exists) {
        save();
        return;
      }

      const genreId = await this.getGenreId(song.value.genres[0]);
      statement.run(song.value.title, song.value.duration, song.value.path, genreId);

      save();
    };

    // Start off the generator
    save();
  });
}

function getGenreId(genre) {
  return new Promise((resolve, reject) => {
    Database.get('SELECT GenreID FROM Genres WHERE Genre = ?', genre, (selectError, row) => {
      if (selectError) {
        reject(selectError);
        return;
      }

      if (row) {
        resolve(row.GenreID);
        return;
      }

      // If the genre isn't yet saved to the DB, save it and resolve the genre's ID
      // SQL results such as `lastID` are bound to `this`, therefore in order to use
      // arrow functions I need to prepare a statement and access the results via the statement
      const query = 'INSERT INTO Genres VALUES (null, ?)';
      const statement = Database.prepare(query).run(genre, (error) => {
        if (error) {
          resolve(error);
          return;
        }

        resolve(statement.lastID);
      });
    });
  });
}

function getSongById(id) {
  return new Promise((resolve, reject) => {
    Database.get('SELECT s.SongID, s.Name, s.Duration, s.FilePath, g.genre FROM Songs s INNER JOIN Genres g ON g.GenreID = s.Genre WHERE s.SongID = ?', id, (error, row) => {
      if (error) {
        reject(error);
        return;
      }

      const song = Utils.parseSong(row.FilePath, row.SongID);
      resolve(song);
    });
  });
}

export default {
  saveSongs, getSongs, getGenreId, getSongById,
};
