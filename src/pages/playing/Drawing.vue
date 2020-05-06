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
            :drawable="true"
            @drawLine="$socket.playerDraw"
          ></base-canvas>
        </div>
      </div>
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
      selectedPrompt: -1
    }
  },
  computed: {
    prompt() {
      return this.$store.state.player.prompt
    },
    promptOptions() {
      return this.$store.state.player.promptOptions
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
}
</style>
