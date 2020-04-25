<template>
  <q-form class="q-gutter-md" @submit="onSubmit">
    <div>
      <q-btn class="full-width" label="Submit" type="submit" color="primary" />
    </div>
  </q-form>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    onSubmit() {
      this.$createLobby({
        isPlayer: false
      })
    }
  }
}
</script>
