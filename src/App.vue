<template>
  <div id="app" class="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style lang="scss">
html, body {
  width: 100% !important;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html {
}

body {
}

.app {
  text-align: center;
  >div {
    overflow: hidden;
  }

}


.grid {
  padding: 20px;
}

</style>
