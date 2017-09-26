<template>
  <div v-if="project">
    <navBar></navBar>
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
import { getProject } from '@/api';
import navigationBar from '@/components/page-elements/Navigation-bar';


export default {
  beforeDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  },
  created() {
    this.getProject();

    // Get the latest data every 30 seconds
    this.interval = setInterval(this.getProject, 30000);
  },
  data() {
    return {
      project: null,
      interval: null,
    };
  },
  methods: {
    getProject() {
      getProject().then((project) => {
        this.project = project;
      });
    },
  },
  name: 'project',

  components: {
    navBar: navigationBar,
  },

};
</script>

<style scoped lang="scss">

</style>
