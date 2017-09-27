<template>
  <div>
    <paper></paper>

    <div class="grid" uk-grid>
      <goodUp></goodUp>

      <div v-if="missingSlug">
        Please submit a slug
      </div>

      <div v-if="project">
        <div class="uk-card uk-card uk-card-default uk-card-body">
          <div class="uk-card-header">
            <h3 class="uk-card-title">{{project.title}}</h3>
          </div>
          <div class="uk-card-body"><p v-html="project.pitch"></p></div>
          <div class="uk-card-footer">
            €{{project.amount_donated.amount}} of €{{project.amount_asked.amount}} donated by {{project.supporter_count}} supporters!
            <div class="">
                <router-link to="/">Donate!</router-link>
            </div>
          </div>
        </div>
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
    navBar: navigationBar,
    paper: wallpaper,
    goodUp: logo,
  },

};
</script>

<style scoped lang="scss">
.wallpaper {
    background-image: url("http://www.planwallpaper.com/static/images/cat-wallpaper-animals_GLl9liz.jpg");
}
</style>
