<template>
  <div>
    We show a success page with confetti here
  </div>
</template>

<script>
import { getOrder } from '@/api';

export default {
  created() {
    getOrder(this.$route.query.order);
  },
  data() {
    return {

    };
  },
  methods: {

  },
  name: 'success',
};
</script>

<style scoped>

</style>
