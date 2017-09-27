<template>
  <nav class="nav-container">
    <ul class="nav-container__list">
      <li>
        <router-link to="/">Order</router-link>
      </li>

      <li class="no-action">
        <router-link to="/paymentmethod">PaymentMethod</router-link>
      </li>

      <li class="no-action">
        <router-link to="/success">Success</router-link>
      </li>

      <li>
        <router-link to="/project">Project</router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
@import '~@/assets/style.scss';

.nav-container {
  background: $primary-color;
  overflow: auto;
  position: fixed;
  bottom: 0;
  width: 100%;
}

nav {
  width: 100%;

  .nav-container__list {
    display: flex;
    margin: 0;
    padding-left: 0;
    width: 100%;

    li {
      list-style: none;
      flex: 1;

      a {
        text-decoration: none;
        color: $white;
        font-size: 12px;
      }
    }

  }
}

.no-action {
  > * {
    pointer-events: none;
  }
}

@media (min-width: 1200px) {
  .uk-navbar-nav {
    li {
      a, span {
        font-size: 0.975rem;
      }
    }
  }
}
</style>
