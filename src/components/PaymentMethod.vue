<template>
  <div>
    <paper></paper>

    <div v-if="missingSlug">
      Please submit a slug
    </div>

    <div class="grid">
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
      <div class="main">
        <div class="info">
          <div class="project">
            <h4>For project</h4>
            <h5>ProjectTitle</h5>
          </div>

          <div class="donation">
            <h4>Donation</h4>
            <h5>€{{donation.amount.amount}}</h5>
          </div>

        </div>
        <h4>Payment method</h4>

        <mySwiper></mySwiper>
      </div>

      <div class="bottom">
        <div class="order__continue">
          <button class="button" type="submit">
            Pay
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
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import bankSwiper from '@/components/page-elements/Bank-swiper';

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
      customTitle: 'Supermercado!',
      customSubtitle: 'Choose your bank',

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
    paper: wallpaper,
    goodUp: logo,
    mySwiper: bankSwiper,
    swiper,
    swiperSlide,
  },

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
  height: 120px;
}

h4 {
  display: flex;
  align-items: center;
  justify-content: left;
}

@media (min-width: 1000px) {
  .selection__choices {
    cursor: pointer;
  }
}

</style>
