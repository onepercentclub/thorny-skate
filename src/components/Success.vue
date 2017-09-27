<template>
  <div class="">
    <canvas id="canvas"></canvas>
    <div class="grid" uk-grid>
      <goodUp></goodUp>

      <div v-if="order && project">

        <div class="uk-card uk-card uk-card-default uk-card-body">
          <div class="uk-card-header">
            <h3 class="uk-card-title">We show a success page with confetti here because your donated €{{order.total.amount}}!</h3>
          </div>
          <div class="uk-card-body"><p>Show this screen to the vendor, we hope you're happy with your new stuff!</p></div>
          <div class="uk-card-footer">
            €{{project.amount_donated.amount}} of €{{project.amount_asked.amount}} donated by {{project.supporter_count}} supporters!
            <div class="">
                <router-link :to="{ path: 'project', query: { slug: project.id }}">Show project!</router-link>
            </div>
          </div>

        </div>

      </div>
    </div>
    <navBar :project="project"></navBar>

  </div>
</template>

<script>
import { mapActions } from 'vuex';
import router from '@/router';

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
    navBar: navigationBar,
    paper: wallpaper,
    goodUp: logo,
  },

};
</script>

<style scoped lang="scss">

.wallpaper {
  background-image: url("http://www.planwallpaper.com/static/images/Mario-mario-wallpaper-hd-games-1920x1080.jpg");
}

</style>
