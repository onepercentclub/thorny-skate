<template>
  <div class="">
    <paper></paper>
    <div class="grid" uk-grid>
      <goodUp></goodUp>
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
    </div>

    <navBar></navBar>

  </div>
</template>

<script>
import { getProject } from '@/api';
import wallpaper from '@/components/page-elements/Wallpaper';
import navigationBar from '@/components/page-elements/Navigation-bar';
import logo from '@/components/page-elements/Logo';

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
    paper: wallpaper,
    goodUp: logo,
  },

};
</script>

<style scoped lang="scss">

</style>
