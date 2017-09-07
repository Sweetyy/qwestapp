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
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 20px;
  }

  .align-center {
    text-align: center;
  }

  .align-left {
    text-align: left;
  }
</style>
