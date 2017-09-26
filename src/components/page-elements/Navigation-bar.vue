<template>

  <nav class="uk-navbar-container" uk-navbar>
    <div class="uk-navbar-left">

        <ul class="uk-navbar-nav">
            <li class="uk-active">
              <a href="#">Order</a>
            </li>
            <li>
              <a href="#">PaymentMethod</a>
            </li>
            <li>
              <a href="#">Success</a>
            </li>
            <li>
              <a href="#">Project</a>
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

    a {
      height: 40px;
      padding: 0 10px;
      font-size: 0.675rem;
    }
  }
}

</style>
