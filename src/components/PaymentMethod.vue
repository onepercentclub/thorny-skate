<template>
  <div>
    <paper></paper>

    <div v-if="missingSlug">
      Please submit a slug
    </div>

    <div class="grid">
      <h2 v-if="customTitle">
        {{customTitle}}
      </h2>

      <h2 v-else>
        {{project.title}}
      </h2>

      <h3 v-if="customSubtitle">
        {{customSubtitle}}
      </h3>

      <div class="info">
        <div class="project">
          <h4>For project</h4>
          <h5>ProjectTitle</h5>
        </div>

        <div class="donation">
          <h4>Donation</h4>
          <!--<h5>{{order.total.amount}}</h5>-->
          <h5>10</h5>
        </div>

      </div>
      <h4>Payment method</h4>
      <div class="selection">

        <div class="selection__choice" v-for="method in methods" >
          <div class="" v-on:click="selectMethod(method.value)">
            <h5 class="">{{method.label}}</h5>
          </div>
        </div>
      </div>
      <goodUp></goodUp>

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
  },

};
</script>

<style scoped lang="scss">
@import '~@/assets/style.scss';


.wallpaper {
}

.info {
  display: flex;
  justify-content: space-between;
  flex: 0.5;
}

.selection {
  display: flex;
  flex: 1;
  overflow-x: scroll;

  .selection__choice {
    height: 90px;
    min-width: 70%;
    margin: 0 20px;
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
}

h4 {
  flex: 0.5;
  display: flex;
  align-items: center;
  justify-content: left;
}

.card {
  margin: 50px auto;

  h3 {
    margin: 0;

    font-size: 30px;
  }
}

@media (min-width: 1000px) {
  .selection__choices {
    cursor: pointer;
  }
}

</style>
