<template>
  <div class="">
    <paper></paper>
    <div class="grid" uk-grid>
      <goodUp></goodUp>
      <form
        class="order"
        v-on:submit.prevent="addDonation"
      >
        <input
          class="uk-input"
          placeholder="Amount"
          type="text"
          v-model="amount"
        >
        <button class="uk-button uk-button-primary" type="submit">
          Continue
        </button>
      </form>
  </div>
  <navBar></navBar>

  </div>
</template>

<script>
import { postDonation } from '@/api';
import router from '@/router';
import navigationBar from '@/components/page-elements/Navigation-bar';
import wallpaper from '@/components/page-elements/Wallpaper';
import logo from '@/components/page-elements/Logo';

export default {
  data() {
    return {
      amount: 0,
    };
  },
  methods: {
    addDonation() {
      postDonation(this.amount).then((donation) => {
        router.push({ path: 'paymentmethod', query: { order: donation.order } });
      }, (error) => {
        console.log(error);
      });
    },
  },

  name: 'order',

  components: {
    navBar: navigationBar,
    paper: wallpaper,
    goodUp: logo,

  },
};
</script>

<style scoped lang="scss">
.uk-input {
  height: 60px;
  font-size: 50px;
  background-color: rgba(255,255,255, .8);
  text-align: center;
}

.uk-button {
  margin: 20px auto;
  width: 100%;
}

.wallpaper {
  background-image: url("https://static.pexels.com/photos/33109/fall-autumn-red-season.jpg");

}

</style>
