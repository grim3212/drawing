<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        GameLayout
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'PlayerLayout',
  data() {
    return {}
  }
  /*,
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.$socket.connected()) return next({ name: 'join' })
      else return next()
    })
  }*/
}
</script>
