<template>
  <div id="wrapper">
    <main>
      <div class="left-side">
        <span class="title">Your Songs ({{ songs().length }} song{{ songs().length > 1 ? 's' : '' }})</span>
        <hr>
        <ol style="list-style:none">
          <li v-for="(song, index) in songs()" :key="index">
            <song :index="index" :id="song.id" :name="song.title" :duration="song.duration" :artists="song.artists"></song>
          </li>
        </ol>
      </div>
      
      <!-- <div class="right-side">
        <div class="doc">
          <div class="title">Music Player</div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dictum ligula at dolor tincidunt,
            ut hendrerit augue dapibus. In et arcu at elit placerat bibendum. Vestibulum ac lacus interdum, consectetur
            nibh eu, porta tellus. Vestibulum quis mi sed odio pellentesque dignissim. Pellentesque sit amet sem id sapien
            imperdiet posuere sit amet sed est.
          </p>
        </div>
        <div class="doc">
          <div class="title alt">More place holder text</div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dictum ligula at dolor tincidunt,
            ut hendrerit augue dapibus. In et arcu at elit placerat bibendum. Vestibulum ac lacus interdum, consectetur
            nibh eu, porta tellus. Vestibulum quis mi sed odio pellentesque dignissim. Pellentesque sit amet sem id sapien
            imperdiet posuere sit amet sed est.
          </p>
        </div>
      </div> -->
    </main>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import Song from './Song';

  export default {
    name: 'library',
    components: { Song },
    mounted() {
      this.refreshSongLibrary();
      console.log('Refreshing song library...');
    },
    methods: {
      ...mapActions(['refreshSongLibrary']),
      ...mapGetters(['songs']),
    },
  };
</script>

<style scoped>
  #wrapper {
    height: 100vh;
    padding: 0px 80px 60px 80px;
    width: 100vw;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div {
    /* flex-basis: 75%; */
    flex-basis: 100%;
  }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }
</style>
