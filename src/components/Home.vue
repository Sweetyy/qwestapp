<template>
  <q-layout ref="layout" view="hHr LpR lFf" :right-breakpoint="1100">
    <!-- Header -->
    <q-toolbar slot="header">
      <q-btn flat @click="$refs.layout.toggleLeft()">
        <q-icon name="menu" />
      </q-btn>
      <q-toolbar-title>
        HeroApp
        <test v-bind:browser="browser"></test>
        <span slot="subtitle">Searching for heroes</span>
      </q-toolbar-title>
    </q-toolbar>
    <!-- Left Side Panel -->
    <div slot="left">
      <q-list no-border link inset-separator>
        <q-list-header>Where to go?</q-list-header>
        <q-side-link item to="/">
          <q-item-side icon="home" />
          <q-item-main label="Home" sublabel="Home page" />
        </q-side-link>
        <q-side-link item to="/comingsoon">
          <q-item-side icon="stars" />
          <q-item-main label="All the heroes" sublabel="List of the heroes" />
        </q-side-link>
        <q-side-link item to="/investigation">
          <q-item-side icon="playlist add check" />
          <q-item-main label="Become a hero" sublabel="Investigation" />
        </q-side-link>
        <q-side-link item to="/comingsoon">
          <q-item-side icon="insert emoticon" />
          <q-item-main label="About us" sublabel="Who are we?" />
        </q-side-link>
      </q-list>
    </div>
    
    <div class="main-content">
      <h4 class="align-center">Home</h4>
      <!-- Explanation's message for the investigation -->
      <q-card>
        <q-card-title class="align-center">
          You can be a hero!
        </q-card-title>
        <q-card-main class="align-center">
          <p>You wanna know if you can be a hero and join us to save the world?!</p>
          <br/>
          <p>Answer the investigation and we will let you know...</p>
        </q-card-main>
        <q-card-separator />
        <q-card-actions class="align-center">
          <!-- Run the investigation -->
          <q-btn color="primary" big style="margin: 0 auto">
            <router-link to="/investigation">I'm a hero!</router-link>
          </q-btn>
          
        </q-card-actions>
      </q-card>
    </div>
    
    <!-- Footer -->
    <q-toolbar slot="footer">
      <q-toolbar-title>
        HeroApp - HeroTeam 2017
      </q-toolbar-title>
    </q-toolbar>
  </q-layout>
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
  QItemMain,
  QProgress,
  QCardTitle,
  QCard,
  QCardMain,
  QCardActions,
  QCardSeparator,
  QRadio,
  QSideLink
} from 'quasar'

import Test from './Test.vue'

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
    QProgress,
    QCardTitle,
    QCard,
    QCardMain,
    QCardActions,
    QCardSeparator,
    QRadio,
    QSideLink,
    'test': Test
  },
  data () {
    return {
      browser: 'Chrome'
    }
  },
  computed: {},
  methods: {}
}
</script>

<style lang="scss">
  .q-btn {
    a {
      color: white;
    }
  }
</style>
