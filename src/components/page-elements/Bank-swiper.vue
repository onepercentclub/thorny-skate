<!-- You can custom the "mySwiper" name used to find the swiper instance in current component -->

<template>
  <div class="selection">
    <swiper class="selection__choice" :options="swiperOption">
      <swiper-slide v-for="method in methods"  class="" v-on:click="selectMethod(method.value)"><h5 class="">{{method.label}}</h5></swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<style scoped lang="scss">
.swiper-slide {
    width: 60%;
  }

  .swiper-slide:nth-child(2n) {
      width: 40%;
  }

  .swiper-slide:nth-child(3n) {
      width: 20%;
  }

  .swiper-slide {
    height: 90px;
    border: 0;
    border-radius: 8px;
    background-color: rgba(47,187,169,1);

    &:focus {
      border: 2px solid rgba(255,180,0,1);
      outline: none;
    }

    > div {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>

<script>
import { postOrderPayment } from '@/api';
import { getAuthorizationUrl } from '@/utils';
import methods from '@/api/payment-methods';

export default {
  data() {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        slidesPerView: 4,
        centeredSlides: true,
        paginationClickable: true,
        spaceBetween: 30,
      },
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
};
</script>
