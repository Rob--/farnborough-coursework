<template>
  <div id="wrapper">
    <main>
      <div class="left-side">
        <span class="title">Click on songs below to create your playlist</span>
        <div class="playlist">
          <div class="control">
            <input v-model="name" class="input" type="text" placeholder="Enter a playlist name">
          </div>
          <a v-on:click="create()" class="button is-primary">Create</a>
        </div>
        <br>
        <div v-if="notification.display" v-bind:class="{ 'is-primary': notification.success, 'is-danger': !notification.success }" class="notification">
          {{ notification.message }}
        </div>
        <hr>
        <ol style="list-style:none">
          <li v-bind:class="{ selected: selected.includes(index) }" v-on:click="select(index)" v-for="(song, index) in songs()" :key="index">
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
    name: 'create-playlist',
    components: { Song },
    data() {
      return {
        selected: [],
        name: '',
        notification: {
          success: true,
          message: '',
          display: false,
        },
      };
    },
    methods: {
      select(songIndex) {
        if (this.selected.includes(songIndex)) {
          const index = this.selected.indexOf(songIndex);
          this.selected.splice(index, 1);
        } else {
          this.selected.push(songIndex);
        }
      },

      create() {
        if (this.selected.length === 0) {
          this.notification.success = false;
          this.notification.message = 'You need to select at least 1 song.';
          this.notification.display = true;
          return;
        }

        if (this.name.length === 0) {
          this.notification.success = false;
          this.notification.message = 'You need to enter a playlist name.';
          this.notification.display = true;
          return;
        }

        const songs = this.selected.map(index => this.songs()[index]);

        this.createPlaylist({
          name: this.name,
          songs,
        }).then(() => {
          this.notification.success = true;
          this.notification.message = `Playlist "${this.name}" has been successfully created.`;
          this.notification.display = true;
        }).catch((error) => {
          this.notification.success = false;
          this.notification.message = error;
          this.notification.display = true;
        });
      },

      ...mapGetters(['songs']),
      ...mapActions(['createPlaylist']),
    },
  };
</script>

<style scoped>
  #wrapper {
    height: 100vh;
    padding: 0px 80px 60px 80px;
    width: 100vw;
  }

  .selected {
    border-left: 10px solid #209cee;
    border-right: 10px solid #209cee;
  }

  .playlist {
    display: flex;
  }

  .playlist > .control {
    flex-basis: 90%;
    margin-right: 10px;
  }
  
  .playlist > .button {
    flex-basis: 10%;
    margin-left: 10px;
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
