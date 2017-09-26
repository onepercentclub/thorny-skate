<template>
  <div class="">
    <canvas id="canvas"></canvas>
    <div class="grid" uk-grid>
      <goodUp></goodUp>

      <div v-if="order">
        <h3>
          We show a success page with confetti here because your donated €{{order.total.amount}}!
        </h3>

        <small>Show this screen to the vendor, we hope you're happy with your new stuff!</small>
      </div>
    </div>
    <navBar></navBar>

  </div>
</template>

<script>
import { getOrder } from '@/api';
import wallpaper from '@/components/page-elements/Wallpaper';
import navigationBar from '@/components/page-elements/Navigation-bar';
import logo from '@/components/page-elements/Logo';

export default {
  created() {
    getOrder(this.$route.query.order).then((order) => {
      this.order = order;
    });
  },

  data() {
    return {
      order: null,
    };
  },

  methods: {

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
