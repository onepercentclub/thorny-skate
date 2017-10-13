<template>
  <div>
    <paper></paper>

    <div class="grid">
      <goodUp></goodUp>

      <div v-if="missingProject">
        Please submit a slug or fundraiser
      </div>

      <div v-if="project">
        <div class="card">
          <div class="card__header">
            <h2 class="card__header--title">
              {{project.title}}
            </h2>
          </div>

          <div class="card__pitch">
            <p v-html="project.pitch"></p>
          </div>

          <div class="card__footer">
            €{{project.amount_donated.amount}} of €{{project.amount_asked.amount}} donated by {{project.supporter_count}} supporters!
            <div class="card__footer--action">
              <router-link to="/">
                <button type="button" name="button">
                  Donate
                </button>
              </router-link>
            </div>
          </div>
        </div>
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

.wallpaper {
  background-image: url("http://www.planwallpaper.com/static/images/cat-wallpaper-animals_GLl9liz.jpg");
}

</style>
