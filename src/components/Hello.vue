<template>
  <main>
    <q-toolbar slot="header" class="glossy">
      <q-toolbar-title>
        QwestApp
        <div slot="subtitle">Running on Quasar v{{$q.version}}</div>
      </q-toolbar-title>
    </q-toolbar>

    <investigation></investigation>
  </main>
</template>

<script>
import {
  QLayout,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QListHeader,
  QItem,
  QItemSide,
  QItemMain
} from 'quasar'
import Investigation from './Investigation.vue'

export default {
  name: 'index',
  components: {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QListHeader,
    QItem,
    QItemSide,
    QItemMain,
    'investigation': Investigation
  },
  data () {
    return {}
  },
  computed: {},
  methods: {}
}
</script>

<style lang="stylus">

</style>
