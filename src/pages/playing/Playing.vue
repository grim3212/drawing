<template>
  <q-page>
    <div class="flex column content-center">
      <h2>Playing</h2>

      <router-view></router-view>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Playing',
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.$socket.connected()) return next({ path: '/' })
      else return next()
    })
  }
}
</script>
