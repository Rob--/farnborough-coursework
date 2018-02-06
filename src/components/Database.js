// https://gist.github.com/jonataswalker/b5a5c008cb92a4721b1e83a2b3b22dc7
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('database.db');

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS Songs (SongID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Duration INTEGER, FilePath TEXT, Genre INTEGER)');
  db.run('CREATE TABLE IF NOT EXISTS Genres (GenreID INTEGER PRIMARY KEY AUTOINCREMENT, Genre TEXT)');
  db.run('CREATE TABLE IF NOT EXISTS SongArtist (SongID INTEGER, ArtistID INTEGER)');
  db.run('CREATE TABLE IF NOT EXISTS Artists (ArtistID INTEGER PRIMARY KEY AUTOINCREMENT, ArtistName TEXT)');
  db.run('CREATE TABLE IF NOT EXISTS PlaylistSongs (PlaylistID INTEGER, SongID INTEGER)');
  db.run('CREATE TABLE IF NOT EXISTS Playlists (PlaylistID INTEGER PRIMARY KEY AUTOINCREMENT, PlaylistName TEXT)');
});

export default db;
