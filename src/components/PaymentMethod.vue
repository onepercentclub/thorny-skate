<template>
  <div>
    <navBar></navBar>
    We show a list of payment methods here
  </div>
</template>

<script>
import navigationBar from '@/components/page-elements/Navigation-bar';

export default {
  data() {
    return {
      paymentMethod: null,
    };
  },
  methods: {

  },
  name: 'paymentMethod',

  components: {
    navBar: navigationBar,
  },

};
</script>

<style scoped lang="scss">

</style>
