class Player {
  static initialise() {
    this.audio = new Audio();
  }

  static play(path) {
    this.audio.src = `file://${path}`;
    this.audio.play();
  }

  static stop() {
    this.audio.stop();
  }

  static setVolume(volume) {
    this.audio.volume = volume;
  }
}

Player.initialise();

export default Player;
