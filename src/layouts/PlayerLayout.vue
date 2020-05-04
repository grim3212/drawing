<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <div class="flex row items-center full-width">
          <span class="player__round">Round {{ round }}</span>
          <span class="player__timer" :class="timerColor">{{ timer }}</span>
          <span class="player__right"></span>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'PlayerLayout',
  computed: {
    timer() {
      return this.$store.state.player.timer
    },
    round() {
      return this.$store.state.player.round
    },
    timerColor() {
      return this.timer <= 10 ? 'text-negative' : 'text-positive'
    }
  }
  /*,
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.$socket.connected()) return next({ name: 'join' })
      else return next()
    })
  }*/
}
</script>

<style lang="scss">
.player__timer {
  font-size: map-get($h3, 'size');
  flex: 1;
  display: flex;
  justify-content: center;
}
.player__round {
  flex: 1;
  display: flex;
  margin-right: auto;
}
.player__right {
  flex: 1;
  display: flex;
  margin-left: auto;
  justify-content: center;
}
</style>
