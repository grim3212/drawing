<template>
  <div>
    <div class="drawing__container column">
      <div
        ref="prompt"
        class="drawing__prompt col-1 flex justify-center items-center"
      >
        <span class="drawing__prompt-text">{{ prompt }}</span>
      </div>
      <div class="drawing__canvas col-11">
        <div class="drawing__canvas-container">
          <base-canvas
            ref="canvas"
            :drawable="true"
            :draw-color="selectedColor"
            :disable="!canDraw"
            @drawLine="$socket.playerDraw"
          ></base-canvas>
        </div>
      </div>
      <q-page-sticky class="column" position="bottom-right" :offset="[16, 16]">
        <q-fab
          icon="palette"
          direction="up"
          :style="
            `background: ${selectedColor}; color: white; margin-bottom: 5px;`
          "
        >
          <q-fab-action
            v-if="selectedColor !== '#000000'"
            color="black"
            icon="colorize"
            @click="selectedColor = '#000000'"
          />
          <q-fab-action
            v-if="selectedColor !== '#FF0000'"
            color="red"
            icon="colorize"
            @click="selectedColor = '#FF0000'"
          />
          <q-fab-action
            v-if="selectedColor !== '#008000'"
            color="green"
            icon="colorize"
            @click="selectedColor = '#008000'"
          />
          <q-fab-action
            v-if="selectedColor !== '#0000FF'"
            color="blue"
            icon="colorize"
            @click="selectedColor = '#0000FF'"
          />
          <q-fab-action
            v-if="selectedColor !== '#FFA500'"
            color="orange"
            icon="colorize"
            @click="selectedColor = '#FFA500'"
          />
          <q-fab-action
            v-if="selectedColor !== '#800080'"
            color="purple"
            icon="colorize"
            @click="selectedColor = '#800080'"
          />
        </q-fab>

        <br />
        <span class="fab-breaker"></span>

        <q-fab icon="edit" direction="left" color="primary">
          <q-fab-action color="negative" icon="delete" @click="clearCanvas" />
        </q-fab>
      </q-page-sticky>
    </div>

    <q-dialog
      v-model="promptSelection"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="bg-teal text-white" style="width: 300px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Choose a prompt</div>
        </q-card-section>

        <q-card-section class="flex justify-between q-pt-none">
          <q-chip
            v-for="(option, idx) of promptOptions"
            :key="idx"
            clickable
            dense
            size="lg"
            :color="selectedPrompt === idx ? 'primary' : ''"
            @click="selectedPrompt = idx"
          >
            {{ option }}
          </q-chip>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn
            v-close-popup
            flat
            :disabled="selectedPrompt === -1"
            label="Select Prompt"
            @click="selectPrompt()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import BaseCanvas from '../../components/BaseCanvas'
export default {
  components: {
    BaseCanvas
  },
  data() {
    return {
      promptSelection: false,
      selectedPrompt: -1,
      selectedColor: '#000000'
    }
  },
  computed: {
    prompt() {
      return this.$store.state.player.prompt
    },
    promptOptions() {
      return this.$store.state.player.promptOptions
    },
    canDraw() {
      return (
        this.$store.state.player.gameState !== 'ROUNDEND' &&
        this.$store.state.player.gameState !== 'GAMEEND'
      )
    }
  },
  mounted() {
    this.promptSelection = !this.prompt
  },
  methods: {
    selectPrompt() {
      const selected = this.promptOptions[this.selectedPrompt]
      this.$store.commit('player/setPrompt', selected)
      this.$socket.choosePrompt({ prompt: selected })
    },
    clearCanvas() {
      this.$refs.canvas.clear()
      this.$socket.clearCanvas()
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.promptSelection = !this.prompt
    next()
  }
}
</script>

<style lang="scss">
.drawing__container {
  height: $content-height;

  .drawing__canvas {
    padding: $space-base;

    .drawing__canvas-container {
      height: 100%;
    }
  }
  .drawing__prompt {
    padding: $space-base;

    .drawing__prompt-text {
      font-size: map-get($h2, 'size');
      // Offset for padding on prompt container
      margin-top: -16px;
    }
  }
  .q-btn--fab .q-btn__wrapper {
    min-width: 32px;
    min-height: 32px;
    padding: 8px;
  }
}
</style>
