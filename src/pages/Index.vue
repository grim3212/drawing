<template>
  <q-page>
    <div class="flex column content-center">
      <h2>{{ $t('title') }}</h2>

      <q-form class="q-gutter-md" @submit="onSubmit">
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
          :rules="[
            val => (val && val.length > 0) || 'Please type a room code',
            val =>
              val.length < 0 ||
              val.length >= 4 ||
              'Room codes are at least 4 characters'
          ]"
        />

        <div>
          <q-btn
            class="full-width"
            label="Submit"
            type="submit"
            color="primary"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data() {
    return {
      username: null,
      roomCode: null
    }
  },
  methods: {
    onSubmit() {}
  }
}
</script>
