<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-icon
          name="dns"
          style="font-size: 2rem;"
          :color="serverUp ? 'positive' : 'negative'"
        >
          <q-tooltip>
            {{ serverHoverText }}
          </q-tooltip>
        </q-icon>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data() {
    return {
      serverUp: false
    }
  },
  computed: {
    serverHoverText() {
      return this.serverUp ? 'Server Up' : 'Server Down'
    }
  },
  mounted() {
    this.$axios
      .get('/api')
      .then(({ data }) => {
        this.serverUp = data
      })
      .catch(() => {
        this.serverUp = false
      })
  }
}
</script>
