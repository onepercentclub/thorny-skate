<template>
  <div>
    <paper></paper>

    <div class="grid" uk-grid>
      <goodUp></goodUp>
      <h3>
        Select your bank:
      </h3>
      <div class="selection">
        <div v-for="method in methods" >
          <div class="uk-card uk-card-default uk-card-body uk-width-1-2@m" v-on:click="selectMethod(method.value)">
            <h3 class="uk-card-title">{{method.label}}</h3>
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
    navBar: navigationBar,
    paper: wallpaper,
    goodUp: logo,
  },

};
</script>

<style scoped lang="scss">
.wallpaper {
  background-image: url("http://www.planwallpaper.com/static/images/cat-wallpaper-animals_GLl9liz.jpg");

}

.selection {
  height: 500px;
  overflow-y: scroll;
}

.uk-card {
  margin: 50px auto;

  h3 {
    font-size: 30px;
    margin: 0;
  }


}
</style>
