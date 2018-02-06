<template>
  <div id="wrapper">
    <div class="control">
      <i v-if="paused()" @click="toggle()" class="fa fa-play" aria-hidden="true"></i>
      <i v-if="!paused()" @click="toggle()" class="fa fa-stop" aria-hidden="true"></i> 
    </div>
    <div id="box">
      <div class="track-control">
        <span>{{ currentTime() }}</span>
        <div class="duration-box">
          <div class="duration" v-bind:style="{ width: (progress() + '%')}">
          </div>
        </div>
        <span>{{duration}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'player',
    mounted() {
      setInterval(() => {
        this.$forceUpdate();
      }, 200);
    },
    methods: {
      ...mapActions(['toggle']),
    },
    computed: {
      ...mapGetters(['duration', 'currentTime', 'progress', 'paused']),
    },
  };
</script>

<style scoped>
  #wrapper {
    height: 135px;
    padding: 0px 80px;
    width: 100vw;
    position: absolute;
    bottom: 0;
    background-color: rgb(236, 236, 236);
    box-shadow: 0px 15px 20px 8px black;
  }

  #box {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }

  .track-control {
    flex-grow: 1;
    display: flex;
  }

  .duration-box {
    width: 100%;
    height: 100%;
    margin: 0px 15px;
    background-color: rgba(0, 0, 0, 0.15);
  }

  .duration {
    height: 100%;
    background-color: rgb(29, 233, 182);
    box-shadow: inset 0px 0px 10px -5px black;
  }

  .control {
    font-size: 2rem;
    text-align: center;
    padding: 20px 0px;
  }

  i {
    cursor: pointer;
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
</style>
