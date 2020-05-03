<template>
  <div class="guess-message__container">
    <div class="row items-center">
      <div class="flex col-9 items-center">
        <q-icon
          :name="icon.name"
          :class="icon.color"
          :left="true"
          size="lg"
          class="guess-message__chat-icon"
        />
        <div class="guess-message__guess flex column">
          <div class="guess-message__message col">{{ text }}</div>
          <div class="guess-message__username col">{{ player }}</div>
        </div>
      </div>
      <div class="col-3">
        <div class="guess-message__timestamp">{{ displayTime() }}</div>
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
      type: String,
      default: ''
    },
    icon: {
      type: Object,
      default: () => {}
    },
    time: {
      type: Number,
      default: Date.now()
    }
  },
  data() {
    return {
      timer: 0
    }
  },
  beforeDestroy() {
    if (this.timer) clearTimeout(this.timer)
    this.timer = 0
  },
  methods: {
    displayTime() {
      const { display, interval } = timeSince(this.time)

      const hourTimeout = 60 * 60 * 1000
      // Default to every hour
      var timeoutLength = hourTimeout
      if (interval === 'second' || interval === 'seconds') {
        timeoutLength = 1000
      } else if (interval === 'minute' || interval === 'minutes') {
        timeoutLength = 60 * 1000
      }

      if (timeoutLength !== hourTimeout) {
        // Lets force the component to update in the intervals we have setup
        this.timer = setTimeout(() => {
          this.$forceUpdate()
        }, timeoutLength)
      } else {
        this.timer = 0
      }

      return display
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
