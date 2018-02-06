class Song {
  constructor(path, metadata, songID = -1) {
    this.id = songID;
    this.path = path;
    this.title = metadata.title;
    this.artists = metadata.artist;
    this.duration = metadata.duration;
    this.genres = metadata.genre;
  }

  toString() {
    return `${this.path}, ${this.title}, ${this.duration}`;
  }
}

export default Song;
