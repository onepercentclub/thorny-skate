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
          <h2>Your transaction was declined</h2>
        </div>

        <div class="bottom">
          <div class="order__continue">
            <button
              class="button"
              type="submit"
              v-on:click="returnToStart"
            >
              Back to Payment
            </button>
          </div>
        </div>
      </div>

      <goodUp></goodUp>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import router from '@/router';

import wallpaper from '@/components/page-elements/Wallpaper';
import logo from '@/components/page-elements/Logo';

export default {
  components: {
    paper: wallpaper,
    goodUp: logo,
  },

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
    returnToStart() {
      router.push({ path: '/' });
    },
    ...mapActions([
      'getOrder',
      'getProject',
    ]),
  },

  name: 'canceled',
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
