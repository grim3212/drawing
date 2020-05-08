<template>
  <div class="create-game__container">
    <q-form @submit="onSubmit">
      <q-input
        v-model.number="numRounds"
        type="number"
        label="Number of Rounds"
        filled
        :rules="[
          val => (val && val > 1) || 'Number of rounds must be at least 2',
          val => val < 20 || 'Maximum number of rounds can only be 20'
        ]"
      />

      <q-checkbox v-model="useMaxPlayers" label="Use Max Players" />

      <q-input
        v-if="useMaxPlayers"
        v-model.number="maxPlayers"
        type="number"
        label="Max number of Players"
        filled
        :rules="[
          val =>
            (val && val > 0) ||
            'Please give a maximum number of players allowed',
          val => val < 20 || 'Maximum number of players can only be 20'
        ]"
      />

      <div>
        <q-btn
          class="full-width"
          label="Create"
          type="submit"
          color="primary"
        />
      </div>
    </q-form>
    <br />
    <q-btn
      class="full-width q-mt-md gt-sm"
      label="Join"
      type="button"
      color="secondary"
      :to="{ name: 'join' }"
    ></q-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      useMaxPlayers: false,
      maxPlayers: 20,
      numRounds: 3
    }
  },
  methods: {
    onSubmit() {
      this.$socket.createLobby({
        isPlayer: false,
        gameSettings: {
          useMaxPlayers: this.useMaxPlayers,
          maxPlayers: this.maxPlayers,
          rounds: this.numRounds
        }
      })
    }
  }
}
</script>

<style lang="scss">
.create-game__container {
  padding: 0 $space-base $space-base $space-base;
}
</style>
