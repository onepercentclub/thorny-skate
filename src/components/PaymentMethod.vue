<template>
  <div>
    <h1>
      We show a list of payment methods here.
    </h1>

    <ul>
      <li v-for="method in methods">
        <button v-on:click="selectMethod(method.value)">
          {{method.label}}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { postOrderPayment } from '@/api';
import { getAuthorizationUrl } from '@/utils';
import methods from '@/api/payment-methods';

export default {
  computed: {
    donation() {
      return this.$store.state.donation;
    },
  },
  data() {
    return {
      methods,
    };
  },
  methods: {
    selectMethod(method) {
      postOrderPayment(method, this.donation.order).then((response) => {
        window.location = getAuthorizationUrl(
          response.authorization_action.url,
          this.donation.order,
        );
      });
    },
  },
  name: 'paymentMethod',
};
</script>

<style scoped>

</style>
