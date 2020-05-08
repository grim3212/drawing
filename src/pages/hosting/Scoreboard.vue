<template>
  <div class="flex column justify-center">
    <div class="scoreboard__container">
      <div class="flex row justify-center items-center content-center">
        <div class="col scoreboard__rank-title">
          Rank
        </div>
        <div class="col scoreboard__player-title">
          Player
        </div>
        <div class="col scoreboard__points-title">
          Points
        </div>
      </div>

      <q-separator />

      <scoreboard-player
        v-for="(player, idx) in winningOrder"
        :key="idx"
        :player="player"
      ></scoreboard-player>
    </div>
  </div>
</template>

<script>
import ScoreboardPlayer from '../../components/ScoreboardPlayer'
export default {
  components: {
    ScoreboardPlayer
  },
  computed: {
    winningOrder() {
      return [...this.$store.state.controller.players].sort((a, b) => {
        if (a.rank < b.rank) {
          return -1
        }
        if (a.rank > b.rank) {
          return 1
        }
        return 0
      })
    }
  }
}
</script>

<style lang="scss">
.scoreboard__container {
  text-align: justify;
  .scoreboard__rank-title {
    text-align: right;
    font-size: map-get($h4, 'size');
  }
  .scoreboard__player-title {
    text-align: center;
    font-size: map-get($h4, 'size');
  }
  .scoreboard__points-title {
    text-align: left;
    font-size: map-get($h4, 'size');
  }
}
</style>
