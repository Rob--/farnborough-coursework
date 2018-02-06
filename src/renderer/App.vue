<template>
  <div id="app">
    <div>
      <div class="tabs">
      <ul>
        <li v-for="tab in tabs" :key="tab" v-on:click="select(tab)" v-bind:class="{ 'is-active': isSelected(tab) }"><a>{{ tab }}</a></li>
      </ul>
    </div>
    <router-view></router-view>
    </div>
    <player></player>
  </div>
</template>

<script>
  import Player from './components/Player';

  export default {
    name: 'farnborough-coursework',
    components: { Player },
    data() {
      return {
        tabs: ['Library', 'Create Playlist', 'Playlists'],
        selected: 'Library',
      };
    },
    methods: {
      isSelected(name) {
        return this.selected === name;
      },
      select(name) {
        this.selected = name;
        this.$router.push({ name });
      },
    },
  };
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Source Sans Pro', sans-serif;
  }

  #app {
    position: relative;
  }

  .tabs {
    padding: 40px 80px 0px 80px;
    font-size: 1.2rem;
  }

  hr {
    padding-top: 2px;
  }
</style>
