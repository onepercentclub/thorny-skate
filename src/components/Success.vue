<template>
  <div v-if="order && project">
    <h3>
      We show a success page with confetti here because your donated €{{order.total.amount}}!
    </h3>

    <small>Show this screen to the vendor, we hope you're happy with your new stuff!</small>

    <router-link :to="{ path: 'project', query: { slug: project.id }}">Show project!</router-link>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

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
    this.getProject(this.$route.query.slug);
    this.getOrder(this.$route.query.order);
  },
  methods: {
    ...mapActions([
      'getOrder',
      'getProject',
    ]),
  },
  name: 'success',
};
</script>

<style scoped>

</style>
