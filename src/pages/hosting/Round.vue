<template>
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
</template>

<script>
import BaseCanvas from '../../components/BaseCanvas'
import DisplayChat from '../../components/DisplayChat'
export default {
  name: 'Round',
  components: {
    BaseCanvas,
    DisplayChat
  },
  computed: {
    room: {
      get() {
        return this.$store.state.controller.room
      }
    },
    players: {
      get() {
        return this.$store.state.controller.players
      }
    }
  },
  mounted() {
    this.$socket.socket.on('drawing', data => {
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
</style>
