<template>
  <div>
    <paper></paper>

    <div class="grid">
      <goodUp></goodUp>
      <h3>
        Select your bank:
      </h3>
      <div class="selection">
        <arrow></arrow>
        <div class="selection__choices" v-for="method in methods" >
          <div class="" v-on:click="selectMethod(method.value)">
            <h5 class="">{{method.label}}</h5>
          </div>
        </div>
      </div>
    </div>
    <navBar></navBar>
  </div>
</template>

<script>
import { postOrderPayment } from '@/api';
import { getAuthorizationUrl } from '@/utils';
import methods from '@/api/payment-methods';
import router from '@/router';
import wallpaper from '@/components/page-elements/Wallpaper';
import navigationBar from '@/components/page-elements/Navigation-bar';
import navigationArrow from '@/components/page-elements/Arrow';
import logo from '@/components/page-elements/Logo';

export default {
  computed: {
    donation() {
      return this.$store.state.donation;
    },
  },
  created() {
    if (!window.localStorage.getItem('slug')) {
      router.push({ path: '/' });
    }
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

  components: {
    arrow: navigationArrow,
    navBar: navigationBar,
    paper: wallpaper,
    goodUp: logo,
  },

};
</script>

<style scoped lang="scss">
@import '~@/assets/style.scss';


.wallpaper {
  background-image: url("http://www.planwallpaper.com/static/images/cat-wallpaper-animals_GLl9liz.jpg");
}

.selection {
  overflow-y: scroll;

  height: 350px;

  .selection__choices {
    margin: 30px auto;

    &:after {
      position: relative;
      top: 15px;

      display: block;

      width: 70%;
      height: 1px;
      margin: 0 auto;

      content: '';

      background-color: $white;
    }
  }
}


.arrow {
  position: relative;
  top: 160px;
  left: 120px;

}

.card {
  margin: 50px auto;

  h3 {
    margin: 0;

    font-size: 30px;
  }
}

</style>
