<template>
  <div>
    <paper></paper>

    <div class="grid">

      <div v-if="order && project">
        <div class="top">
          <div class="top__image--container">
          </div>
        </div>
        <div class="main">
          <h2>Your payment has been approved</h2>

          <div class="donated-amount">
            € Hier dynamische data
          </div>

          <h3>Show this to your vendor and get your bonus card</h3>
        </div>

        <div class="bottom">
          <div class="order__continue">
            <button class="button" type="submit">
              Continue
            </button>
          </div>
          <goodUp></goodUp>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import router from '@/router';

import wallpaper from '@/components/page-elements/Wallpaper';
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
    const slug = window.localStorage.getItem('slug');

    if (slug) {
      this.getProject(slug);
      this.getOrder(this.$route.query.order);
    } else {
      router.push({ path: '/' });
    }
  },

  methods: {
    ...mapActions([
      'getOrder',
      'getProject',
    ]),
  },

  name: 'success',

  components: {
    paper: wallpaper,
    goodUp: logo,
  },

};
</script>

<style scoped lang="scss">
canvas {
  position: absolute;
  top: 0;

  width: 100%;
  height: 100%;
}

.wallpaper {
}

.card__footer--action {
  margin: 20px auto;
}

</style>
