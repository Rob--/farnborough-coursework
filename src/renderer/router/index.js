import Vue from 'vue';
import Router from 'vue-router';
import 'bulma/css/bulma.css';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/library',
      name: 'Library',
      component: require('@/components/Library').default,
    },
    {
      path: '/create-playlist',
      name: 'Create Playlist',
      component: require('@/components/CreatePlaylist').default,
    },
    {
      path: '/playlists',
      name: 'Playlists',
      component: require('@/components/Playlists').default,
    },
    {
      path: '*',
      redirect: '/library',
    },
  ],
});
