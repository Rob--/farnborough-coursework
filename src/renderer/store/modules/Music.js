import Utils from '../../../components/Utils';
import Database from '../../../components/Database';

Utils.getMusicFolder().then(async (files) => {
  const songs = await Utils.filePathsToSongs(files);
  Database.saveSongs(songs);
});

const mutations = {

};

const actions = {

};

const getters = {

};

export default {
  state: {},
  mutations,
  actions,
  getters,
};
