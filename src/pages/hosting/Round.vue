<template>
  <div>
    <div class="row">
      <div class="round__canvas col-9">
        <div class="round__canvas-container">
          <base-canvas ref="canvas" :drawable="false"></base-canvas>
        </div>
      </div>
      <div class="round__chat col-3">
        <display-chat></display-chat>
      </div>
    </div>
    <div v-if="roundEnd" class="round__end-prompt-body">
      <p class="round__end-prompt-text">{{ prompt }}</p>
    </div>
  </div>
</template>

<script>
import BaseCanvas from '../../components/BaseCanvas'
import DisplayChat from '../../components/DisplayChat'
import bus from '../../scripts/bus'
export default {
  name: 'Round',
  components: {
    BaseCanvas,
    DisplayChat
  },
  computed: {
    room() {
      return this.$store.state.controller.room
    },
    players() {
      return this.$store.state.controller.players
    },
    prompt() {
      return this.$store.state.controller.prompt
    },
    roundEnd() {
      return this.$store.state.controller.gameState === 'ROUNDEND'
    }
  },
  mounted() {
    bus.$on('roundEnd', () => {
      this.$refs.canvas.clear()
    })
    bus.$on('drawing', data => {
      this.$refs.canvas.drawLine(data)
    })
  }
}
</script>

<style lang="scss">
.round__canvas {
  padding: $space-base;
  .round__canvas-container {
    height: $content-spaced-height;
  }
}
.round__chat {
  padding: $space-base;
}
.round__end-prompt-body {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba($color: #000000, $alpha: 0.75);

  .round__end-prompt-text {
    font-size: map-get($h2, 'size');
    color: $positive;
    -webkit-text-stroke: 2px black;
    font-weight: map-get($text-weights, 'bold');
  }
}
</style>
