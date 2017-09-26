<template>
  <div>
    <navBar></navBar>
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
import navigationBar from '@/components/page-elements/Navigation-bar';

export default {
  created() {
    this.order = this.$route.query.order;
  },
  data() {
    return {
      methods,
      order: null,
    };
  },
  methods: {
    selectMethod(method) {
      // And here we go to DocData
      postOrderPayment(method, this.order).then((response) => {
        window.location = getAuthorizationUrl(response.authorization_action.url, this.order);
      });
    },
  },
  name: 'paymentMethod',

  components: {
    navBar: navigationBar,
  },

};
</script>

<style scoped lang="scss">

</style>
