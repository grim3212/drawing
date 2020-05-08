<template>
  <div class="base-canvas__container">
    <canvas
      ref="internalCanvas"
      :width="width"
      :height="height"
      class="base-canvas__canvas"
    ></canvas>
  </div>
</template>

<script>
import { throttle } from 'quasar'
export default {
  props: {
    drawable: {
      type: Boolean,
      default: false
    },
    drawColor: {
      type: String,
      default: '#000000'
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      width: 100,
      height: 100,
      currentlyDrawing: false,
      selected: {
        posX: 0,
        posY: 0
      }
    }
  },
  computed: {
    canvas() {
      return this.$refs.internalCanvas
    },
    ctx() {
      return this.canvas.getContext('2d')
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()

    if (this.drawable) {
      this.canvas.addEventListener('mousedown', this.onMouseDown, false)
      this.canvas.addEventListener('mouseup', this.onMouseUp, false)
      this.canvas.addEventListener('mouseout', this.onMouseUp, false)
      this.canvas.addEventListener(
        'mousemove',
        throttle(this.onMouseMove, 10),
        false
      )

      //Touch support for mobile devices
      this.canvas.addEventListener('touchstart', this.onMouseDown, false)
      this.canvas.addEventListener('touchend', this.onMouseUp, false)
      this.canvas.addEventListener('touchcancel', this.onMouseUp, false)
      this.canvas.addEventListener(
        'touchmove',
        throttle(this.onMouseMove, 10),
        false
      )
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)

    if (this.drawable) {
      this.canvas.removeEventListener('mousedown', this.onMouseDown, false)
      this.canvas.removeEventListener('mouseup', this.onMouseUp, false)
      this.canvas.removeEventListener('mouseout', this.onMouseUp, false)
      this.canvas.removeEventListener(
        'mousemove',
        throttle(this.onMouseMove, 10),
        false
      )

      //Touch support for mobile devices
      this.canvas.removeEventListener('touchstart', this.onMouseDown, false)
      this.canvas.removeEventListener('touchend', this.onMouseUp, false)
      this.canvas.removeEventListener('touchcancel', this.onMouseUp, false)
      this.canvas.removeEventListener(
        'touchmove',
        throttle(this.onMouseMove, 10),
        false
      )
    }
  },
  methods: {
    handleResize() {
      const parent = this.$refs.internalCanvas.parentElement
      this.width = parent.clientWidth
      this.height = parent.clientHeight
    },
    clear() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },
    onMouseDown(e) {
      if (this.disable) return
      this.currentlyDrawing = true

      const rect = e.target.getBoundingClientRect()
      const x = e.offsetX || e.targetTouches[0].pageX - rect.left
      const y = e.offsetY || e.targetTouches[0].pageY - rect.top

      this.selected.posX = x
      this.selected.posY = y
    },

    onMouseUp(e) {
      if (this.disable || !this.currentlyDrawing) {
        return
      }
      this.currentlyDrawing = false

      if (e.type !== 'touchend') {
        this.drawLine({
          x0: this.selected.posX,
          y0: this.selected.posY,
          x1: e.offsetX,
          y1: e.offsetY,
          color: this.drawColor
        })
      }
    },

    onMouseMove(e) {
      if (this.disable || !this.currentlyDrawing) {
        return
      }

      const rect = e.target.getBoundingClientRect()
      const x = e.offsetX || e.targetTouches[0].pageX - rect.left
      const y = e.offsetY || e.targetTouches[0].pageY - rect.top

      this.drawLine({
        x0: this.selected.posX,
        y0: this.selected.posY,
        x1: x,
        y1: y,
        color: this.drawColor
      })
      this.selected.posX = x
      this.selected.posY = y
    },
    drawLine({ x0, y0, x1, y1, color }) {
      if (!this.drawable) {
        const w = this.canvas.width
        const h = this.canvas.height
        x0 = x0 * w
        y0 = y0 * h
        x1 = x1 * w
        y1 = y1 * h
      }

      this.ctx.beginPath()
      this.ctx.moveTo(x0, y0)
      this.ctx.lineTo(x1, y1)
      this.ctx.strokeStyle = color
      this.ctx.lineWidth = 2
      this.ctx.stroke()
      this.ctx.closePath()

      if (this.drawable) {
        var w = this.canvas.width
        var h = this.canvas.height

        this.$emit('drawLine', {
          x0: x0 / w,
          y0: y0 / h,
          x1: x1 / w,
          y1: y1 / h,
          color: color
        })
      }
    }
  }
}
</script>

<style lang="scss">
.base-canvas__container {
  height: 100%;

  .base-canvas__canvas {
    outline: black 3px solid;
  }
}
</style>
