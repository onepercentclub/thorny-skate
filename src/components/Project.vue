<template>
  <div v-if="project">
    <div class="meter">
      <div class="meter__filler" :style="{ height: percentage + '%' }"></div>
    </div>

    <paper></paper>

    <div class="grid">
      <div v-if="missingProject">
        Please submit a slug or fundraiser
      </div>

      <div>
        <main>
          <div v-if="project.supporter_count">
            <h2>{{project.supporter_count}} people donated €{{project.amount_donated.amount}}</h2>
          </div>
          <div v-else>
            <h2>Amount donated €{{project.amount_donated.amount}}</h2>
          </div>
        </main>
      </div>

      <div class="bottom">
        <goodUp></goodUp>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import wallpaper from '@/components/page-elements/Wallpaper';
import logo from '@/components/page-elements/Logo';

export default {
  beforeDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  },

  components: {
    paper: wallpaper,
    goodUp: logo,
  },

  computed: {
    percentage() {
      const { amount, amount_asked: amoundAsked, amount_donated: amoundDonated } = this.project;

      if (amoundAsked) {
        return (amoundDonated.amount / amoundAsked.amount) * 100;
      }

      return (amoundDonated.amount / amount.amount) * 100;
    },
    project() {
      return this.$store.state.project || this.$store.state.fundraiser;
    },
  },

  created() {
    this.fundraiser = this.$route.query.fundraiser || window.localStorage.getItem('fundraiser');
    this.slug = this.$route.query.slug || window.localStorage.getItem('slug');

    let refreshFunc = () => {};

    if (this.fundraiser) {
      refreshFunc = () => this.getFundraiser(this.fundraiser);
      window.localStorage.setItem('fundraiser', this.fundraiser);
    } else if (this.slug) {
      refreshFunc = () => this.getProject(this.slug);
      window.localStorage.setItem('slug', this.slug);
    } else {
      this.missingProject = true;
    }

    if (!this.missingProject) {
      refreshFunc();
      this.interval = setInterval(refreshFunc, 30000);
    }
  },

  data() {
    return {
      interval: null,
      missingProject: false,
      slug: null,
    };
  },

  methods: {
    ...mapActions([
      'getFundraiser',
      'getProject',
    ]),
  },

  name: 'project',
};
</script>

<style scoped lang="scss">

.meter {
  background-color: #dbdbdb;
  height: 75vh;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100vw;
  z-index: -1;

  .meter__filler {
    background-color: #E47872;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: block;
    transform: rotate(180deg);
  }
}


main {
  h2 {
    position: relative;
    left: -200px;
    transform: rotate(-35deg);

    &:after {
      background-image: none;
    }
  }
}

.wallpaper {
  background-image: url('../assets/images/project-wp.png');
  background-repeat: no-repeat;
}

</style>
