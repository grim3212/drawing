<template>
  <div class="flex column justify-center items-center content-center">
    <h2>Drawing with Friends</h2>
    <p class="text-h5">
      Join at: <span class="text-teal">{{ room }}</span>
    </p>
    <q-btn
      class="full-width q-mt-md gt-sm"
      label="Start Game"
      type="button"
      color="primary"
      @click="$socket.startGame()"
    ></q-btn>
    <div class="lobby__container">
      <lobby-player
        v-for="(player, idx) in players"
        :key="idx"
        :username="player.username"
        :icon="player.icon"
      ></lobby-player>
    </div>
  </div>
</template>

<script>
import LobbyPlayer from '../../components/LobbyPlayer'
export default {
  name: 'Lobby',
  components: {
    LobbyPlayer
  },
  computed: {
    room: {
      get() {
        return this.$store.state.controller.room
      }
    },
    players: {
      get() {
        return this.$store.state.controller.players
      }
    }
  }
}
</script>

<style lang="scss">
.lobby__container {
  text-align: justify;
}
</style>
