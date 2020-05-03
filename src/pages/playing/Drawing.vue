<template>
  <div class="drawing__container column">
    <div ref="prompt" class="drawing__prompt col-1">
      Prompt
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
</template>

<script>
import BaseCanvas from '../../components/BaseCanvas'
export default {
  components: {
    BaseCanvas
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
  }
}
</style>
