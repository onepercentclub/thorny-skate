<template>
  <div>
    <div v-if="missingSlug">
      Please submit a slug
    </div>

    <div v-if="project">
      <h1>
        {{project.title}}
      </h1>

      <p v-html="project.pitch"></p>

      <!-- Make a chart / diagram of this -->
      <h3>
        €{{project.amount_donated.amount}} of €{{project.amount_asked.amount}} donated by {{project.supporter_count}} supporters!
      </h3>

      <router-link :to="{ path: '/'}">Donate!</router-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

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
    this.slug = this.$route.query.slug;

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
};
</script>

<style scoped>

</style>
