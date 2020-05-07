<template>
  <div class="guess-message__container">
    <div class="row items-center">
      <div class="flex col items-center">
        <q-icon
          :name="player.icon"
          :left="true"
          size="lg"
          class="guess-message__chat-icon"
          :style="`color: ${player.favoriteColor};`"
        />
        <div class="guess-message__guess flex column">
          <div v-if="!correct" class="guess-message__message col">
            {{ text }}
          </div>
          <div
            v-else-if="ownCorrect"
            class="guess-message__message col text-green"
          >
            {{ text }}
          </div>
          <div v-else class="guess-message__message col text-green">
            Correct!
          </div>
          <div class="guess-message__username col">{{ username }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { timeSince } from '../scripts/util'
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    player: {
      type: Object,
      default: () => {}
    },
    time: {
      type: Number,
      default: Date.now()
    },
    correct: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      timer: 0
    }
  },
  computed: {
    ownCorrect() {
      return this.correct && this.player.id === this.selfId
    },
    username() {
      return this.player.username
    },
    selfId() {
      return this.$store.state.player.self.id
    }
  }
}
</script>

<style lang="scss">
.guess-message__container {
  .guess-message__message {
    white-space: pre-wrap;
    white-space: -moz-pre-wrap !important;
    word-wrap: break-word;
    white-space: normal;
  }
  .guess-message__timestamp {
    font-size: 10px;
    font-style: italic;
  }
  .guess-message__guess {
    display: inline-block;
  }
  .guess-message__username {
    font-size: 10px;
  }
}
</style>
