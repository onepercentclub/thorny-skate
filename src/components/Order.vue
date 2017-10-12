<template>
  <div>
    <paper></paper>

    <div v-if="missingSlug">
      Please submit a slug
    </div>

    <div class="grid" v-if="project">
      <div class="top">
        <h2 v-if="customTitle">
          {{customTitle}}
        </h2>

        <h2 v-else>
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
            <button class="button" type="submit">
              Continue
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
      customTitle: 'Supermercado!',
      customSubtitle: 'Buy your bonus card',
      amount: 10,
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
    changeAmount(amount) {
      this.amount = this.amount + amount;
    },
    ...mapActions([
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
    background-size: 200px 200px;
    max-width: 200px;
    max-height: 200px;
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
    margin-top: 20px;

    span {
      border-radius: 50% 50%;
      display: inline-block;
      background-color: #E47872;
      padding: 15px;
      width: 25px;
      height: 25px;
      margin: 0 20px;
      font-size: 20px;

      &:nth-child(2) {
        &:after {
          content: '';
          display: block;
          position: relative;
          height: 50px;
          width: 3px;
          top: -40px;
          left: -35px;
          background-color: white;
        }
      }
    }
  }

  .bottom {
    left: 0;
    right: 0;
  }
}

</style>
