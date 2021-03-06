<template>
  <div>
    <paper></paper>

    <div v-if="missingProject">
      Please submit a slug or fundraiser
    </div>

    <div class="grid" v-if="project">
      <div class="top">
        <h2>
          {{project.title}}
        </h2>

        <h3 v-if="customSubtitle">
          {{customSubtitle}}
        </h3>
      </div>

      <form
        class="main"
        v-on:submit.prevent="addDonation"
      >
        <div class="order__input">
          <input
            class="order__input"
            placeholder="Amount"
            type="text"
            v-model="amount"
          >
        </div>

        <div class="order__buttons">
          <span
            class="buttons__decrease"
            role="button"
            v-if="amount > 10"
            v-on:click="changeAmount(-10)"
          >
            -1
          </span>

          <span
            class="buttons__increase"
            role="button"
            v-on:click="changeAmount(+10)"
          >
            +1
          </span>
        </div>

        <div class="bottom">
          <div class="order__continue">
            <button
              :disabled="loading"
              class="button"
              type="submit"
              v-bind:class="{ 'button--loading': loading }"
            >
              <span v-if="loading">
                Loading...
              </span>

              <span v-else>
                Continue
              </span>
            </button>
            <pageLogo></pageLogo>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import router from '@/router';
import wallpaper from '@/components/page-elements/Wallpaper';
import logo from '@/components/page-elements/Logo';

export default {
  components: {
    pageLogo: logo,
    paper: wallpaper,
  },

  computed: {
    donation() {
      return this.$store.state.donation;
    },
    project() {
      return this.$store.state.project || this.$store.state.fundraiser;
    },
  },

  created() {
    this.fundraiser = this.$route.query.fundraiser || window.localStorage.getItem('fundraiser');
    this.slug = this.$route.query.slug || window.localStorage.getItem('slug');

    if (this.fundraiser) {
      this.getFundraiser(this.fundraiser);
      window.localStorage.setItem('fundraiser', this.fundraiser);
    } else if (this.slug) {
      this.getProject(this.slug);
      window.localStorage.setItem('slug', this.slug);
    } else {
      this.missingProject = true;
    }
  },

  data() {
    return {
      amount: 10,
      customSubtitle: 'Buy your bonus card',
      fundraiser: null,
      loading: false,
      missingProject: false,
      slug: null,
    };
  },

  methods: {
    addDonation() {
      this.loading = true;

      const { amount, fundraiser } = this;

      if (!this.slug) {
        this.slug = this.project.project;
      }

      this.postDonation({ amount, fundraiser, slug: this.slug }).then(() => {
        router.push({ path: '/paymentmethod' });
      }, (error) => {
        console.log(error);
      });
    },
    changeAmount(amount) {
      this.amount = this.amount + amount;
    },
    ...mapActions([
      'getFundraiser',
      'getProject',
      'postDonation',
    ]),
  },

  name: 'order',
};
</script>

<style scoped lang="scss">

.main {
  // position: relative;
  // &:after {
  //   content: '€';
  //   position: relative;
  //   top: 120px;
  //   left: -50px;
  //   font-size: 50px;
  //   z-index: 100;
  //
  // }

  .order__input {
    background: url('../assets/images/bonus-card.png');
    background-position: center center;
    background-size: 170px 170px;
    //max-width: 200px;
  //  max-height: 200px;
    display: block;
    margin: 0 auto;
    background-repeat: no-repeat;
    flex: 4;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;

    &:after {
      content: '€';
      position: relative;
      display: block;
      left: -40px;
      top: -25px;
      font-size: 80px;
    }

    input {
      display: block;
      position: relative;
      top: 75px;
      left: 10px;
      color: #000 !important;

      max-width: 200px;
      padding: 5px;

      transition: all 0.3s ease-out;
      text-align: center;

      color: #555;
      border-radius: 5px;
      background: rgba(255, 255, 255, 0);
      border: 0;

      font-size: 80px;

      outline: none;

      &:focus {
        outline: none;
        background-position: 0 -1.7em;
      }
    }
  }

  .order__buttons {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      border-radius: 50% 50%;
      display: inline-block;
      background-color: #E47872;
      padding: 15px;
      width: 25px;
      height: 25px;
      margin: 0 20px;
      font-size: 20px;
      color: white;
      box-shadow: 0 0 2px 0 rgba(0,0,0,0.12), 0 2px 2px 0 rgba(0,0,0,0.24);
      outline: none;
      transition: .1s all;
      top: 0px;

      &:last-child {
        background-color: #72C2B0;

      }

      &:active {
        position: relative;
        top: 2px;
        box-shadow: none !important;

        trasition: All 250ms ease;

        outline: none;

      }
    }
  }

  .bottom {
    left: 0;
    right: 0;
  }
}

</style>
