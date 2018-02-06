class Player {
  static initialise() {
    this.audio = new Audio();
  }

  static play(path) {
    if (path) {
      this.audio.src = `file://${path}`;
    }

    this.audio.play();
  }

  static stop() {
    this.audio.pause();
  }

  static setVolume(volume) {
    this.audio.volume = volume;
  }

  static getTime() {
    return this.audio.currentTime;
  }

  static paused() {
    return this.audio.paused;
  }
}

Player.initialise();

export default Player;
