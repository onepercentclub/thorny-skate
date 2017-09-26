<template>
  <div v-if="project">
    <h1>
      {{project.title}}
    </h1>

    <p v-html="project.pitch"></p>

    <!-- Make a chart / diagram of this -->
    <h3>
      €{{project.amount_donated.amount}} of €{{project.amount_asked.amount}} donated by {{project.supporter_count}} supporters!
    </h3>

    <router-link to="/">Donate!</router-link>
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
    this.getProject();

    // Get the latest data every 30 seconds
    this.interval = setInterval(this.getProject, 30000);
  },
  data() {
    return {
      interval: null,
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
