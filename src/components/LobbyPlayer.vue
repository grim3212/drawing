<template>
  <div class="flex row items-center content-center lobby-player__container">
    <q-icon
      :name="locked ? 'lock' : 'lock_open'"
      size="lg"
      class="lobby-player__icon"
      :style="`color: ${locked ? '#21ba45' : '#c10015'};`"
    />
    <q-icon
      :name="player.icon"
      size="lg"
      class="lobby-player__icon"
      :style="`color: ${player.favoriteColor};`"
    />
    <span>{{ player.username }}</span>
  </div>
</template>

<script>
export default {
  name: 'LobbyPlayer',
  props: {
    player: {
      type: Object,
      required: true
    }
  },
  computed: {
    locked() {
      return this.player.locked
    }
  }
}
</script>

<style lang="scss">
.lobby-player__container {
  margin-bottom: 1rem;

  .lobby-player__icon {
    margin-right: 1rem;
  }
}
</style>
