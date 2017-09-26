<template>
  <div>
    <navBar></navBar>
    We show a success page with confetti here
  </div>
</template>

<script>
import navigationBar from '@/components/page-elements/Navigation-bar';

export default {
  data() {
    return {

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
