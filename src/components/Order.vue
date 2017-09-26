<template>
  <div class="">
    <navBar></navBar>
    <form
      class="order"
      v-on:submit.prevent="addDonation"
    >
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
import { postDonation } from '@/api';
import router from '@/router';
import navigationBar from '@/components/page-elements/Navigation-bar';

export default {
  data() {
    return {
      amount: 0,
    };
  },
  methods: {
    addDonation() {
      postDonation(this.amount).then(() => {
        router.push('paymentmethod');
      }, (error) => {
        console.log(error);
      });
    },
  },

  name: 'order',

  components: {
    navBar: navigationBar,
  },
};
</script>

<style scoped>

</style>
