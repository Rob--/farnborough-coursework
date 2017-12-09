<template>
    <div class="song" v-bind:class="{ active: playing }" @mouseover="onMouseover()" @mouseout="onMouseout()">
        <div class="track">
            <span v-if="!hover">{{index + 1}}.</span>
            <i v-if="hover" @click="play()" class="fa fa-play" aria-hidden="true"></i>
        </div>
        <div class="details">
            <div class="name" v-bind:class="{ active: playing }">{{name}}</div>
            <div class="artist">{{artists.join(', ')}}</div>
       </div>
       <div class="duration">{{formatDuration(duration)}}</div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'song',
  props: ['name', 'duration', 'index', 'artists', 'id'],
  data() {
    return {
      hover: false,
    };
  },
  methods: {
    formatDuration(duration) {
      const minutes = Math.floor(duration / 60);
      let seconds = Math.round(duration - (minutes * 60));

      if (seconds < 10) seconds = `0${seconds}`;

      return `${minutes}:${seconds}`;
    },

    onMouseover() {
      this.hover = true;
    },

    onMouseout() {
      this.hover = false;
    },

    play() {
      this.playSong(this.id);
      console.log(`Now playing: ${this.name}`);
    },

    ...mapActions(['playSong']),
  },
  computed: {
    playing() {
      return this.isPlaying(this.id);
    },

    ...mapGetters(['isPlaying']),
  },
};
</script>

<style scoped>
i {
    font-size: 28px;
    cursor: pointer;
}

.song.active {
    border-bottom: 2px solid #1DE9B6;
    background-color: rgba(0, 191, 165, 0.13) !important;
    box-shadow: inset 0px 0px 10px -5px black;
}

.name.active {
    color: rgb(0, 142, 123);
}

.song {
    display: flex;
    height: 4.56em;
    list-style-type: none;
    position: relative;
    padding: 10px;

    transition: all 0s ease-in;
}

.song:hover {
    background-color: rgba(0, 0, 0, 0.08);
    box-shadow: inset 0px 0px 15px -7px black;
}

.track {
    display: flex;
    padding-right: 10px;
    font-size: 18px;
    margin-top: 5px;
    color: rgba(74, 74, 74, 0.8);
    width: 2.5em;
    flex-direction: column;
    align-items: center;
}

.details {
    height:4.56em;
    flex: 1;
}

.details > .name {
    font-size: 22px;
}

.details > .artist {
    margin-top: -5px;
    color: rgba(74, 74, 74, 0.8);
}

.duration {
    height: 4.56em;
    display: block;
    font-size: 18px;
    color: rgba(74, 74, 74, 0.8);
}

.draw-bottom::before, .draw-bottom::after {
    display: block;
    content: "";
    position:absolute;
    left: 0;
    bottom: 0;
    height: 5px;
    background: -webkit-linear-gradient(right,#84fab0 10%,#8fd3f4) !important;
    background: linear-gradient(to left,#84fab0 10%,#8fd3f4) !important;
}

.draw-bottom::before, .draw-bottom::after {
    width: 0;
}

.draw-bottom:hover::before, .draw-bottom:hover::after {
    width: 100%;
}

.draw-bottom:hover::before {
    -webkit-transition: width 0.5s ease-out;
    transition: width 0.5s ease-out
}

.draw-bottom:hover::after {
    -webkit-transition: width 0.5s ease-out;
    transition: width 0.5s ease-out;
}
</style>
