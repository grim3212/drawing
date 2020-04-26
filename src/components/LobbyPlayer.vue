<template>
  <div class="flex row items-center content-center lobby-player__container">
    <q-icon
      :name="icon.name"
      :class="icon.color"
      size="lg"
      class="lobby-player__icon"
    />
    <span>{{ username }}</span>
  </div>
</template>

<script>
export default {
  name: 'LobbyPlayer',
  props: {
    username: {
      type: String,
      required: true
    },
    icon: {
      type: Object,
      default() {
        return {
          name: 'font_download',
          color: 'text-orange'
        }
      }
    }
  }
}
</script>

<style lang="scss">
.lobby-player__container {
  margin-bottom: 1rem;

  .lobby-player__icon {
    margin-right: 1rem;
  }
}
</style>
