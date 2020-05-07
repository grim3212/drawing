<template>
  <div class="waiting__container">
    <div>
      <h1 class="flex justify-center">{{ username }}</h1>

      <div class="flex column justify-center items-center">
        <q-icon
          :name="selectedIcon"
          size="5rem"
          :style="`color: ${selectedColor};`"
          clickable
          @click.stop="!locked ? (iconPicker = true) : ''"
        />

        <q-input v-if="!locked" v-model="selectedColor" filled>
          <template v-slot:append>
            <q-icon name="colorize" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-color v-model="selectedColor" flat square no-header />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <br />

        <q-btn v-if="!locked" label="Lock in" color="primary" @click="lockIn" />

        <q-dialog v-model="iconPicker" persistent>
          <q-card style="width: 700px; max-width: 80vw;">
            <q-toolbar>
              <q-toolbar-title>Choose icon</q-toolbar-title>
            </q-toolbar>

            <q-card-section>
              <q-input v-model="search" label="Search...">
                <template v-slot:before>
                  <q-icon
                    :name="selectedIcon"
                    :style="`color: ${selectedColor};`"
                    size="xl"
                  />
                </template>
              </q-input>
            </q-card-section>
            <q-card-section style="height: 30vh" class="scroll">
              <q-btn
                v-for="qicon of icons"
                :key="qicon"
                :icon="qicon"
                round
                flat
                :style="`color: ${selectedColor};`"
                @click="selectedIcon = qicon"
              >
                <q-tooltip
                  transition-show="scale"
                  transition-hide="scale"
                  :delay="500"
                >
                  {{ qicon }}
                </q-tooltip>
              </q-btn>
            </q-card-section>

            <q-separator />

            <q-card-actions align="right" class="text-primary">
              <q-btn v-close-popup label="Okay" color="deep-orange" />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>
    <span class="waiting__id">{{ id }}</span>
  </div>
</template>

<script>
import iconLibrary from '../../scripts/icons'
export default {
  data() {
    return {
      search: '',
      iconPicker: false,
      selectedColor: '#000000',
      selectedIcon: 'font_download'
    }
  },
  computed: {
    username() {
      return this.$store.state.player.self.username
    },
    id() {
      return this.$store.state.player.self.id
    },
    locked() {
      return this.$store.state.player.self.locked
    },
    icons() {
      return this.search
        ? iconLibrary.filter(item => item.includes(this.search))
        : iconLibrary
    }
  },
  methods: {
    lockIn() {
      this.$store.commit('player/lockIn', {
        icon: this.selectedIcon,
        color: this.selectedColor
      })
      this.$socket.lockIn({
        icon: this.selectedIcon,
        color: this.selectedColor
      })
    }
  }
}
</script>

<style lang="scss">
.waiting__container {
  max-height: $content-height;

  .waiting__id {
    position: absolute;
    right: 0px;
    bottom: 0px;
  }
}
</style>
