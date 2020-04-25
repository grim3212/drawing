<template>
  <q-form class="q-gutter-md" @submit="onSubmit">
    <q-checkbox v-model="useMaxPlayers" label="Use Max Players" />

    <q-input
      v-if="useMaxPlayers"
      v-model.number="maxPlayers"
      type="number"
      filled
      :rules="[
        val =>
          (val && val > 0) || 'Please give a maximum number of players allowed',
        val => val < 20 || 'Maximum number of players can only be 20'
      ]"
    />

    <div>
      <q-btn class="full-width" label="Submit" type="submit" color="primary" />
    </div>
  </q-form>
</template>

<script>
export default {
  data() {
    return {
      useMaxPlayers: false,
      maxPlayers: 10
    }
  },
  methods: {
    onSubmit() {
      this.$socket.createLobby({
        isPlayer: false,
        gameSettings: {
          useMaxPlayers: this.useMaxPlayers,
          maxPlayers: this.maxPlayers
        }
      })
    }
  }
}
</script>
