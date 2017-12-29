import Utils from '../../../components/Utils';
import Database from '../../../components/Database';
import Player from '../../../components/Player';

const mutations = {
  SET_SONG_LIBRARY(state, songs) {
    state.songLibrary = songs;
  },

  SET_CURRENTLY_PLAYING(state, id) {
    state.currentlyPlaying = id;
  },
};

const actions = {
  refreshSongLibrary(context) {
    Utils.getMusicFolder().then(async (files) => {
      const songs = await Utils.filePathsToSongs(files);
      await Database.saveSongs(songs);

      const newSongs = await Database.getSongs();
      context.commit('SET_SONG_LIBRARY', newSongs);
    });
  },

  async playSong(context, id) {
    const song = await Database.getSongById(id);
    Player.play(song.path);
    context.commit('SET_CURRENTLY_PLAYING', id);
  },

  stopPlaying(context) {
    context.commit('SET_CURRENTLY_PLAYING', -1);
  },
};

const getters = {
  isPlaying: state => id => state.currentlyPlaying === id,
};

export default {
  state: {
    songLibrary: [],
    currentlyPlaying: -1,
  },
  mutations,
  actions,
  getters,
};
