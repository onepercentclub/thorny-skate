<template>
  <div>
    <paper></paper>

    <div class="grid">
      <goodUp></goodUp>

      <div v-if="missingSlug">
        Please submit a slug
      </div>

      <div v-if="project">
        <h2>
          {{project.title}}
        </h2>

        <h5>
          Select your amount:
        </h5>

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

          <button class="" type="submit">
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
@import '~@/assets/style.scss';


input {
  display: block;

  width: 100%;
  height: 30px;
  margin: 20px auto;
  padding: 5px;

  transition: all 0.3s ease-out;
  text-align: center;

  color: #555;
  border: 1px solid darken($primary-color, 5%);
  border-radius: 5px;
  background: linear-gradient(#eee, #fff);

  font-size: 20px;

  outline: none;

  &focus {
    outline: none;
    background-position: 0 -1.7em;
  }

}

.wallpaper {
  background-image: url("https://static.pexels.com/photos/33109/fall-autumn-red-season.jpg");

}

</style>
