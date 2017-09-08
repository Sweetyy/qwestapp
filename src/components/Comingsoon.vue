<template>
  <div class="error-page window-height window-width bg-light column items-center no-wrap">
    <div class="error-code bg-primary flex items-center justify-center">
      <q-item-side icon="build" />
    </div>
    <div>
      <div class="error-card shadow-4 bg-white column items-center justify-center no-wrap">
        <q-icon name="error_outline" color="grey-5" />
        <p class="caption text-center">Coming Soon...</p>
        <p class="text-center group">
          <q-btn
            v-if="canGoBack"
            color="primary"
            push
            @click="goBack"
            icon="keyboard_arrow_left"
          >
            Go back
          </q-btn>
          <q-btn
            color="primary"
            push
            @click="$router.replace('/home')"
            icon-right="home"
          >
            Go home
          </q-btn>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { QBtn, QIcon, QItemSide } from 'quasar'

export default {
  components: {
    QBtn,
    QIcon,
    QItemSide
  },
  data () {
    return {
      canGoBack: window.history.length > 1
    }
  },
  methods: {
    goBack () {
      window.history.go(-1)
    }
  }
}
</script>

<style lang="stylus">
.error-page
  .error-code
    height 50vh
    width 100%
    padding-top 0
    font-size 30vmax
    color rgba(255, 255, 255, .2)
    overflow hidden
    .q-item-side
      display: flex;
      .q-icon
        width: 100%;
        padding-top: 0;
        font-size: 15vmax;
        color: rgba(255,255,255,0.2);
        overflow: hidden;
  .error-card
    border-radius 2px
    margin-top -50px
    width 80vw
    max-width 600px
    padding 25px
    > i
      font-size 5rem
</style>
