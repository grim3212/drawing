<template>
  <q-page>
    <div class="flex column content-center">
      <h2>{{ $t('title') }}</h2>

      <join-form />
    </div>
  </q-page>
</template>

<script>
import JoinForm from '../components/JoinForm'
export default {
  name: 'PageIndex',
  components: {
    JoinForm
  }
}
</script>
