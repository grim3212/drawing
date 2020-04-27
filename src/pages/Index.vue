<template>
  <q-page>
    <div class="flex column content-center">
      <span class="index__title">{{ $t('title') }}</span>

      <router-view></router-view>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex'
}
</script>

<style lang="scss">
.index__title {
  font-size: map-get($h2, 'size');
  padding-bottom: $space-base;

  @media (max-width: $breakpoint-sm-max) {
    font-size: map-get($h3, 'size');
  }

  @media (max-width: $breakpoint-xs-max) {
    font-size: map-get($h4, 'size');
  }
}
</style>
