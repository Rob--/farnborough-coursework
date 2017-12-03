import Utils from '../../../components/Utils';

Utils.getMusicFolder().then((files) => {
  files.forEach(async (file) => {
    const song = await Utils.parseSong(file);
    console.log(song);
  });
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
