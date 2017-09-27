<template>
  <nav class="uk-navbar-container" uk-navbar>
    <div class="uk-navbar-left">
      <ul class="uk-navbar-nav">
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
    </div>
  </nav>
</template>

<style scoped lang="scss">
.uk-navbar-container {
  overflow: auto;
  position: fixed;
  bottom: 0;
  width: 100%;
}

.uk-navbar-nav {
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
