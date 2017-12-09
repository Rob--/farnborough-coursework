import Utils from '../../../components/Utils';
import Database from '../../../components/Database';

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
      Database.saveSongs(songs);

      context.commit('SET_SONG_LIBRARY', songs);
    });
  },

  playSong(context, id) {
    // [ play the song ]
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
