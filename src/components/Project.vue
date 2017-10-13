<template>
  <div>
    <div class="meter">
      <div class="meter__filler" style="height: 90%;"></div>
    </div>
    <paper></paper>
    <div class="grid">
      <div v-if="missingSlug">
        Please submit a slug
      </div>

      <div v-if="project">

        <main>
          <div class="">
            <h2>X people donated €1200</h2>
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
  computed: {
    project() {
      return this.$store.state.project;
    },
  },
  created() {
    this.slug = this.$route.query.slug || window.localStorage.getItem('slug');

    if (this.slug) {
      this.getProject(this.slug);
      window.localStorage.setItem('slug', this.slug);
    } else {
      this.missingSlug = true;
    }

    // Get the latest data every 30 seconds
    this.interval = setInterval(() => this.getProject(this.$route.query.slug), 30000);
  },
  data() {
    return {
      interval: null,
      missingSlug: false,
    };
  },
  methods: {
    ...mapActions([
      'getProject',
    ]),
  },
  name: 'project',

  components: {
    paper: wallpaper,
    goodUp: logo,
  },

};
</script>

<style scoped lang="scss">

.meter{
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
