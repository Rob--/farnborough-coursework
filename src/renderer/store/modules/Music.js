import Utils from '../../../components/Utils';
import SongService from '../../../components/Services/SongService';
import PlaylistService from '../../../components/Services/PlaylistService';
import Player from '../../../components/Player';

const mutations = {
  SET_SONG_LIBRARY(state, songs) {
    state.songLibrary = songs;
  },

  SET_PLAYLISTS(state, playlists) {
    state.playlists = playlists;
  },

  SET_CURRENTLY_PLAYING(state, song) {
    state.currentlyPlaying = song.id;
    state.currentSong = song;
  },
};

const actions = {
  async refreshSongLibrary(context) {
    // get array of file paths
    const files = await Utils.getMusicFolder();

    // map file paths to Song objects
    const songs = await Utils.filePathsToSongs(files);

    // save all the songs to the database
    await SongService.saveSongs(songs);

    // after saving the songs, each song will have a SongID now
    // so we get the songs from the DB to get their IDs as well
    const newSongs = await SongService.getSongs();
    context.commit('SET_SONG_LIBRARY', newSongs);
  },

  async refreshPlaylists(context) {
    const playlists = await PlaylistService.getPlaylists();
    context.commit('SET_PLAYLISTS', playlists);
  },

  async playSong(context, id) {
    PlaylistService.getPlaylists();
    const song = await SongService.getSongById(id);
    Player.play(song.path);
    context.commit('SET_CURRENTLY_PLAYING', song);
  },

  async stopSong(context) {
    Player.stop();
    context.commit('SET_CURRENTLY_PLAYING', -1);
  },

  async createPlaylist(context, { name, songs }) {
    return PlaylistService.createPlaylist(name, songs);
  },

  toggle() {
    if (Player.paused()) {
      Player.play();
    } else {
      Player.stop();
    }
  },
};

const getters = {
  isPlaying: state => id => state.currentlyPlaying === id,

  paused: () => () => Player.paused(),

  duration: (state) => {
    if (state.currentlyPlaying === -1) {
      return Utils.formatDuration(0);
    }

    return Utils.formatDuration(state.currentSong.duration);
  },

  // has to be a function we call otherwise Vue will compute the value
  // and won't keep calling it
  currentTime: state => () => {
    if (state.currentlyPlaying === -1) {
      return Utils.formatDuration(0);
    }

    return Utils.formatDuration(Player.getTime());
  },

  progress: state => () => {
    if (state.currentlyPlaying === -1) {
      return 0;
    }

    return (Player.getTime() / state.currentSong.duration) * 100;
  },

  songs: state => state.songLibrary,

  playlists: state => state.playlists,
};

export default {
  state: {
    songLibrary: [],
    playlists: [],
    currentlyPlaying: -1,
    currentSong: {},
  },
  mutations,
  actions,
  getters,
};
