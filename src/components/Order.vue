<template>
  <form
    class="order"
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
  },
  created() {
    this.getProject();
  },
  data() {
    return {
      amount: 0,
    };
  },
  methods: {
    addDonation() {
      this.postDonation(this.amount).then(() => {
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
