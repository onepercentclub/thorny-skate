<template>
  <div>
    <paper></paper>

    <div class="grid">
      <div class="top">
        <h2>
          {{project.title}}
        </h2>

        <h3 v-if="customSubtitle">
          {{customSubtitle}}
        </h3>
      </div>
      <div class="main">
        <div class="info">
          <div class="project">
            <h4>For project</h4>

            <h5>{{project.title}}</h5>
          </div>

          <div
            class="donation"
            v-if="donation"
          >
            <h4>Donation</h4>
            <h5>€{{donation.amount.amount}}</h5>
          </div>

        </div>
        <h4>Payment method</h4>

        <bankSwiper
          :methods="methods"
          :selectedMethod.sync="selectedMethod"
        ></bankSwiper>
      </div>

      <div class="bottom">
        <div class="order__continue">
          <button
            :disabled="loading"
            class="button"
            type="submit"
            v-bind:class="{ 'button--loading': loading }"
            v-on:click="toPayment"
          >
            <span v-if="loading">
              Laden...
            </span>

            <span v-else>
              Betalen
            </span>
          </button>
        </div>

        <goodUp></goodUp>
      </div>
    </div>
  </div>
</template>

<script>
import { postOrderPayment } from '@/api';
import { getAuthorizationUrl } from '@/utils';
import methods from '@/api/payment-methods';
import router from '@/router';
import wallpaper from '@/components/page-elements/Wallpaper';
import logo from '@/components/page-elements/Logo';
import bankSwiper from '@/components/page-elements/Bank-swiper';

export default {
  components: {
    paper: wallpaper,
    goodUp: logo,
    bankSwiper,
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
    if (!(window.localStorage.getItem('fundraiser') || window.localStorage.getItem('slug')) || !this.donation) {
      router.push({ path: '/' });
    }
  },

  data() {
    return {
      customTitle: '¡Supermercado!',
      customSubtitle: 'Choose your bank',
      loading: false,
      methods,
      selectedMethod: null,
    };
  },

  methods: {
    toPayment() {
      this.loading = true;
      const method = this.selectedMethod;

      postOrderPayment(method, this.donation.order).then((response) => {
        window.location = getAuthorizationUrl(
          response.authorization_action.url,
          this.donation.order,
        );
      });
    },
  },

  name: 'paymentMethod',
};
</script>

<style scoped lang="scss">


.wallpaper {
}

.info {
  display: flex;
  justify-content: space-between;
}

.selection {
  display: flex;
  flex: 1;
  height: 130px;
}

h4 {
  display: flex;
  align-items: center;
  justify-content: left;
}

h5 {
  text-align: left;
}

@media (min-width: 1000px) {
  .selection__choices {
    cursor: pointer;
  }
}

</style>
