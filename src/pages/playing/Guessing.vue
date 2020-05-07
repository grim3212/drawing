<template>
  <div class="quessing__container column">
    <div class="guessing__chat-messages col-11">
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

    <div class="guessing__form col-1">
      <q-form ref="guessForm">
        <q-input
          v-model="chat"
          filled
          label="Guess"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Must have a guess']"
        >
          <template v-slot:after>
            <q-btn
              round
              dense
              flat
              icon="send"
              type="submit"
              @click="onSubmit"
            />
          </template>
        </q-input>
      </q-form>
    </div>
  </div>
</template>

<script>
import GuessMessage from '../../components/GuessMessage'
export default {
  components: {
    GuessMessage
  },
  data() {
    return {
      chat: ''
    }
  },
  computed: {
    guesses: {
      get() {
        return this.$store.state.player.guesses
      }
    },
    player() {
      return this.$store.state.player.self
    }
  },
  methods: {
    onSubmit() {
      this.$refs.guessForm.validate().then(success => {
        if (success) {
          const guess = {
            player: this.player,
            text: this.chat,
            time: Date.now()
          }

          this.$socket.sendGuess(guess)
          // Reset input
          this.chat = ''
          this.$refs.guessForm.resetValidation()
        }
      })
    }
  }
}
</script>

<style lang="scss">
.quessing__container {
  height: $content-spaced-height;

  .guessing__chat-messages {
    overflow-y: auto;

    .guessing__chat-icon {
      margin-right: 1rem;
    }
  }
}
</style>
