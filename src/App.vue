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

html {font-size: 1em;}

body {
  font-weight: 400;
  line-height: 1.45;
  color: #333;
}

p {margin-bottom: 1.3em;}

h1, h2, h3, h4 {
  margin: 1.414em 0 0.5em;
  font-weight: inherit;
  line-height: 1.2;
}

h1 {
  margin-top: 0;
  font-size: 3.998em !important;
}

h2 {
  font-size: 2.827em !important;

}

h3 {
  font-size: 1.999em !important;
}

h4 {
  font-size: 1.414em !important;
}

small, .font_small {
  font-size: 0.618em !important;
}

html {
}

body {
}

.app {
  text-align: center;\

  > div {
    overflow: hidden;
  }

}

.grid {
  padding: 20px 20px;
}

.uk-card {
  background-color: rgba(255,255,255, .9);
}

.uk-card-body {
  padding: 30px 10px;
}

@media (min-width: 1200px) {
  .grid {
    padding: 20px 250px;
  }
}



</style>
