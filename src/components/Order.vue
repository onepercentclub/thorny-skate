<template>
  <div>
    <paper></paper>
    <div class="grid" uk-grid>
      <goodUp></goodUp>
      <h1>
        {{project.title}}
      </h1>

      <h2>
        Select your amount:
      </h2>
      <form
        class="order"
        v-on:submit.prevent="addDonation"
        v-if="project"
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
  <navBar :project="project"></navBar>

  </div>
</template>

<script>
import { mapActions } from 'vuex';
import router from '@/router';
import navigationBar from '@/components/page-elements/Navigation-bar';
import wallpaper from '@/components/page-elements/Wallpaper';
import logo from '@/components/page-elements/Logo';

export default {
  computed: {
    donation() {
      return this.$store.state.donation;
    },
    project() {
      return this.$store.state.project;
    },
    slug() {
      return this.$route.query.slug;
    },
  },
  created() {
    this.getProject(this.slug);
  },
  data() {
    return {
      amount: 0,
    };
  },
  methods: {
    addDonation() {
      this.postDonation({ amount: this.amount, slug: this.slug }).then(() => {
        router.push({ path: 'paymentmethod' });
      }, (error) => {
        console.log(error);
      });
    },
    ...mapActions([
      'getProject',
      'postDonation',
    ]),
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
  margin: 50px auto;
}

.uk-button {
  margin: 20px auto;
  width: 100%;
}

.wallpaper {
  background-image: url("https://static.pexels.com/photos/33109/fall-autumn-red-season.jpg");

}

</style>
