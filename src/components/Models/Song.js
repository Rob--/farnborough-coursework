class Song {
  constructor(path, metadata, songID = -1) {
    this.id = songID;
    this.path = path;
    this.title = metadata.title;
    this.artists = metadata.artist;
    this.duration = metadata.duration;
    this.year = metadata.year;
    this.pictures = metadata.picture;
    this.genres = metadata.genre;
  }
}

export default Song;
