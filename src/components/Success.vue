<template>
  <div>
    <paper></paper>

    <div class="grid">

      <div v-if="order && project">
        <div class="top">

        </div>
        <div class="main">
          <div class="card">
            <div class="card__header">
              <h3 class="card__header--title">We show a success page with confetti here because your donated €{{order.total.amount}}!</h3>
            </div>
            <div class="card__pitch"><p>Show this screen to the vendor, we hope you're happy with your new stuff!</p></div>
            <div class="card__footer">
              €{{project.amount_donated.amount}} of €{{project.amount_asked.amount}} donated by {{project.supporter_count}} supporters!
              <div class="card__footer--action">
                  <router-link :to="{ path: 'project', query: { slug: project.id }}">
                    <button type="button" name="button">
                      Show project!
                    </button>
                  </router-link>
                </div>
            </div>
          </div>
        </div>

        <div class="bottom">
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
