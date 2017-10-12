<template>
  <div class="selection">
    <swiper
      :options="swiperOption"
      class="selection__choice"
    >
      <swiper-slide
        v-bind:key="method.value"
        v-for="method in methods"
        v-on:click="selectMethod(method.value)"
      >
        <h5>
          {{method.label}}
        </h5>
      </swiper-slide>

      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        onTransitionEnd: (slider) => {
          const method = this.methods[slider.activeIndex].value;
          this.$emit('update:selectedMethod', method);
        },
        slidesPerView: 2,
        centeredSlides: true,
        paginationClickable: true,
        spaceBetween: 20,
      },
    };
  },

  props: ['methods', 'selectedMethod'],
};
</script>

<style scoped lang="scss">
  @keyframes wobble {
    0% {transform: translateX(0%);}
    15% {transform: rotate(-5deg);}
    30% {transform: rotate(3deg);}
    45% {transform: rotate(-3deg);}
    60% {transform: rotate(2deg);}
    75% {transform: rotate(-1deg);}
    100% {transform: translateX(0%);}
}
.swiper-container, .swiper-wrapper {
  padding: 5px;
}
  .swiper-slide {
    height: 90px;
    border: 0;
    border-radius: 8px;
    background-color: rgba(47,187,169,1);
    width: 100px;

    &.swiper-slide-active {
      border: 2px solid rgba(255,180,0,1);
      outline: none;
      animation-name: wobble;
      animation-duration: .5s;
    }

    > h5 {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24px;
    }
  }
</style>
