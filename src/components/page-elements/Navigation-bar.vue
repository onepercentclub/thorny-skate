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
.nav-container {
  background: $primary-color;
  overflow: auto;
  position: fixed;
  bottom: 0;
  width: 100%;
}

nav {
  width: 100%;

  li {
    flex: 1;

    a{
      display: flex;
      height: 40px;
      padding: 0 10px;
      font-size: 0.675rem;
      color: #999;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      text-decoration: none;
      align-items: center;
      justify-content: center;
      transition-property: color, background-color;
      text-transform: uppercase;

    }
  }
}

.no-action {
  > * {
    pointer-events: none;
  }
}

.router-link-active {
  color: green !important;
}

.router-link-exact-active {
  text-decoration: underline !important;
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
