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
          <h3>Your payment has been approved</h3>

          <h2>{{order.total.amount}} Euro</h2>

          <hr>

          <h4>Show this to your vendor and get your bonus card</h4>
        </div>

        <div class="bottom">
          <div class="order__continue">
            <button
              class="button"
              type="submit"
              v-on:click="returnToStart"
            >
              Buy more!
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
      return this.$store.state.fundraiser || this.$store.state.project;
    },
  },

  created() {
    const fundraiser = window.localStorage.getItem('fundraiser');
    const slug = window.localStorage.getItem('slug');

    if (fundraiser) {
      this.getFundraiser(fundraiser);
      this.getOrder(this.$route.query.order);
    } else if (slug) {
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
      'getFundraiser',
      'getOrder',
      'getProject',
    ]),
  },

  name: 'success',
};
</script>

<style scoped lang="scss">

h2 {
  &:after {
    background: none;
    height: 0;
  }
}

.grid {
  .top {
    left:0;
    width: 100%;

    .top__image--container {
      display: block;
      border: 4px solid white;
      background-image: url('../assets/images/0.png');

      &:after {
        background-image: url('../assets/images/check.png');
        width: 180px;
        height: 180px;
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

  .main {
  }
}
canvas {
  position: absolute;
  top: 0;

  width: 100%;
  height: 100%;
}

.wallpaper {
  background-image: url('../assets/images/bg-approved.png');
  background-size: contain !important;
}

.card__footer--action {
  margin: 20px auto;
}

</style>
