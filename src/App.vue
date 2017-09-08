<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
/*
 * Root component
 */
export default {}
</script>

<style>
  .layout-page {
    min-height: auto !important;
  }
  
  .main-content {
    max-width: 800px;
    margin: 40px auto;
  }

  h4 {
    margin-bottom: 40px;
  }

  .align-center {
    text-align: center;
  }

  .align-left {
    text-align: left;
  }

  .flexbox {
    display: flex;
    align-items: center;
  }

  .flexstart {
    align-items: flex-start;
  }

  .flexend {
    align-items: flex-end;
  }

  .flexcenter {
    justify-content: center;
  }

  .flexspacearound {
    justify-content: space-around;
  }
</style>
