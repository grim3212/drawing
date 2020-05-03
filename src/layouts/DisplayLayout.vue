<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        DisplayLayout
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'DisplayLayout',
  data() {
    return {}
  }
  /*,
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.$socket.connected()) return next({ name: 'create' })
      else return next()
    })
  }*/
}
</script>
