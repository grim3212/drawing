<template>
  <q-page>
    <div class="flex column content-center">
      <h2>{{ $t('title') }}</h2>

      <router-view></router-view>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex'
}
</script>
