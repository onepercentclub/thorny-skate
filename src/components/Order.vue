<template>
  <div>
    <div v-if="missingSlug">
      Please submit a slug
    </div>

    <form
      class="order"
      v-if="project"
      v-on:submit.prevent="addDonation"
    >
      <h1>
        {{project.title}}
      </h1>

      <input
        placeholder="Amount"
        type="text"
        v-model="amount"
      >

      <button type="submit">
        Proceed with payment
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import router from '@/router';

export default {
  computed: {
    donation() {
      return this.$store.state.donation;
    },
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
  },
  data() {
    return {
      amount: 0,
      missingSlug: false,
      slug: null,
    };
  },
  methods: {
    addDonation() {
      this.postDonation({ amount: this.amount, slug: this.slug }).then(() => {
        router.push({ path: '/paymentmethod' });
      }, (error) => {
        console.log(error);
      });
    },
    ...mapActions([
      'getProject',
      'postDonation',
    ]),
  },
  name: 'order',
};
</script>

<style scoped>

</style>
