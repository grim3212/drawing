<template>
  <div class="join-game__container">
    <q-form @submit="onSubmit">
      <q-input
        v-model="username"
        filled
        label="Username"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please add a username']"
      />

      <q-input
        v-model="roomCode"
        filled
        label="Room Code"
        lazy-rules
        mask="XXXXX"
        :rules="[
          val => (val && val.length > 0) || 'Please type a room code',
          val =>
            val.length < 0 ||
            val.length >= 4 ||
            'Room codes are at least 4 characters'
        ]"
      />

      <div>
        <q-btn class="full-width" label="Join" type="submit" color="primary" />
      </div>
    </q-form>
    <br />
    <q-btn
      class="full-width q-mt-md gt-sm"
      label="Create"
      type="button"
      color="secondary"
      :to="{ name: 'create' }"
    ></q-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: null,
      roomCode: null
    }
  },
  methods: {
    onSubmit() {
      this.$store.commit('player/setupPlayer', {
        username: this.username,
        roomCode: this.roomCode
      })
      this.$socket.playerJoin({
        username: this.username,
        roomCode: this.roomCode,
        isPlayer: true
      })
    }
  }
}
</script>

<style lang="scss">
.join-game__container {
  padding: 0 $space-base $space-base $space-base;
}
</style>
