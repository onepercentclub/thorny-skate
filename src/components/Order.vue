<template>
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
    slug() {
      return this.$route.query.slug;
    },
  },
  created() {
    this.getProject(this.slug);
  },
  data() {
    return {
      amount: 0,
    };
  },
  methods: {
    addDonation() {
      this.postDonation({ amount: this.amount, slug: this.slug }).then(() => {
        router.push({ path: 'paymentmethod' });
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
