<template>
  <div
    class="flex row justify-center items-center content-center scoreboard-player__container"
  >
    <div
      class="col scoreboard-player__rank"
      :class="{
        'scoreboard-player__first': player.rank === 1,
        'scoreboard-player__tie': player.tie
      }"
    >
      {{ player.rank }}
    </div>

    <div class="col">
      <q-icon
        :name="player.icon"
        size="lg"
        class="scoreboard-player__icon"
        :style="`color: ${player.favoriteColor};`"
      />
      <span>{{ player.username }}</span>
    </div>
    <div class="col scoreboard-player__points">
      {{ player.points }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    player: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
.scoreboard-player__container {
  margin-bottom: 1rem;

  .scoreboard-player__icon {
    margin-right: 1rem;
  }
  .scoreboard-player__rank {
    font-size: map-get($h4, 'size');
    color: $secondary;
    text-align: right;
    margin-right: 2rem;
  }
  .scoreboard-player__first {
    color: $positive;
  }
  .scoreboard-player__tie {
    color: $accent;
  }
  .scoreboard-player__points {
    font-size: map-get($h5, 'size');
    text-align: left;
  }
}
</style>
