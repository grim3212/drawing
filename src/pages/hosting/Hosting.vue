<template>
  <q-page>
    <div class="flex column justify-center items-center content-center">
      <h2>Hosting</h2>
    </div>

    <router-view></router-view>
  </q-page>
</template>

<script>
export default {
  name: 'Hosting',
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.$socket.connected()) return next({ path: 'create' })
      else return next()
    })
  }
}
</script>
