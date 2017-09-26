<template>
  <navBar></navBar>
  <div v-if="order">
    <h3>
      We show a success page with confetti here because your donated €{{order.total.amount}}!
    </h3>

    <small>Show this screen to the vendor, we hope you're happy with your new stuff!</small>
  </div>
</template>

<script>
import { getOrder } from '@/api';
import navigationBar from '@/components/page-elements/Navigation-bar';


export default {
  created() {
    getOrder(this.$route.query.order).then((order) => {
      this.order = order;
    });
  },
  data() {
    return {
      order: null,
    };
  },
  methods: {

  },
  name: 'success',

  components: {
    navBar: navigationBar,
  },
};
</script>

<style scoped lang="scss">

</style>
