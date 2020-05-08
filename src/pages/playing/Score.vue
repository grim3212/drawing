<template>
  <div class="flex column justify-center items-center">
    <span class="text-h2">
      Rank
    </span>
    <span
      class="score__rank"
      :class="{
        score__first: rank === 1,
        score__tie: tied
      }"
    >
      {{ rank }}
    </span>
    <span class="text-h2">
      Final Points
    </span>
    <span class="score__points">
      {{ points }}
    </span>
  </div>
</template>

<script>
export default {
  computed: {
    points() {
      return this.$store.state.player.points
    },
    rank() {
      return this.$store.state.player.rank
    },
    tied() {
      return this.$store.state.player.tie
    }
  }
}
</script>

<style lang="scss">
.score__rank {
  font-size: map-get($h1, 'size');
  color: $secondary;
  text-align: right;
}
.score__first {
  color: $positive;
}
.score__tie {
  color: $accent;
}
.score__points {
  font-size: map-get($h2, 'size');
  text-align: left;
}
</style>
