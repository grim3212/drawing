<template>
  <div class="display-chat__container">
    <guess-message
      v-for="(guess, idx) of guesses"
      :key="idx"
      :player="guess.player"
      :text="guess.text"
      :time="guess.time"
      :correct="guess.correct"
    >
    </guess-message>
  </div>
</template>

<script>
import GuessMessage from './GuessMessage'
export default {
  components: {
    GuessMessage
  },
  computed: {
    guesses: {
      get() {
        return this.$store.state.controller.guesses
      }
    }
  }
}
</script>

<style lang="scss">
.display-chat__container {
  overflow-y: auto;
  height: $content-spaced-height;

  .display-chat__icon {
    margin-right: 1rem;
  }
}
</style>
