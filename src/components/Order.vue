<template>
  <div>
    <paper></paper>

    <div class="grid" uk-grid>
      <goodUp></goodUp>

      <div v-if="missingSlug">
        Please submit a slug
      </div>

      <div v-if="project">
        <h1>
          {{project.title}}
        </h1>

        <h2>
          Select your amount:
        </h2>

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
    </div>

    <navBar></navBar>
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
  },
  created() {
    this.slug = this.$route.query.slug || window.localStorage.getItem('slug');

    if (this.slug) {
      this.getProject(this.slug);
      window.localStorage.setItem('slug', this.slug);
    } else {
      this.missingSlug = true;
    }
  },
  data() {
    return {
      amount: 0,
      missingSlug: false,
      slug: null,
    };
  },
  methods: {
    addDonation() {
      this.postDonation({ amount: this.amount, slug: this.slug }).then(() => {
        router.push({ path: '/paymentmethod' });
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
    goodUp: logo,
    navBar: navigationBar,
    paper: wallpaper,
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
