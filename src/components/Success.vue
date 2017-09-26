<template>
  <div class="">
    <canvas id="canvas"></canvas>
    <div class="grid" uk-grid>
      <goodUp></goodUp>

      <div v-if="order && project">
        <h3>
          We show a success page with confetti here because your donated €{{order.total.amount}}!
        </h3>

        <small>Show this screen to the vendor, we hope you're happy with your new stuff!</small>

        <router-link :to="{ path: 'project', query: { slug: project.id }}">Show project!</router-link>

      </div>
    </div>
    <navBar></navBar>

  </div>
</template>

<script>
import { mapActions } from 'vuex';

import wallpaper from '@/components/page-elements/Wallpaper';
import navigationBar from '@/components/page-elements/Navigation-bar';
import logo from '@/components/page-elements/Logo';

export default {
  computed: {
    order() {
      return this.$store.state.order;
    },
    project() {
      return this.$store.state.project;
    },
  },

  created() {
    this.getProject(this.$route.query.slug);
    this.getOrder(this.$route.query.order);
  },

  methods: {
    ...mapActions([
      'getOrder',
      'getProject',
    ]),
  },

  name: 'success',

  components: {
    navBar: navigationBar,
    paper: wallpaper,
    goodUp: logo,
  },

};
</script>

<style scoped lang="scss">

canvas {
  display: block;
  position: relative;
  zindex: 1;
  pointer-events: none;
}

</style>
