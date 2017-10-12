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
          <h3>Your transaction was declined</h3>
        </div>

        <div class="bottom">
          <div class="order__continue">
            <button
              class="button"
              type="submit"
              v-on:click="returnToStart"
            >
              Try again
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
.grid {
  .top {
    left:0;
    width: 100%;

    .top__image--container {
      display: block;
      border: 4px solid rgba(255, 255, 255, 0);
      background-color: rgba(255,255,255, .7);

      &:after {
        background-image: url('../assets/images/failure.png');
        width: 150px;
        height: 150px;
        content: '';
        display: block;
        position: relative;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100%;
        top: 0px;
        left: 0px;

      }
    }
  }
}

canvas {
  position: absolute;
  top: 0;

  width: 100%;
  height: 100%;
}

.wallpaper {
  background-image: url('../assets/images/bg-failure.png');
  background-size: contain !important;
}

.card__footer--action {
  margin: 20px auto;
}

</style>
