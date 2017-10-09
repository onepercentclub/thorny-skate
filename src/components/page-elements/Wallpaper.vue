<template>
  <div class="wallpaper"></div>
</template>

<style scoped lang="scss">
.wallpaper {
    background-position: center;
    background-size: cover;
    position: absolute;
    height: 100%;
    width: 100%;
    overflow: hidden;
    z-index: -1;
    top: 0;

    &:before {
      position: relative;
      top: 0;
      content: '';
      display: block;
      height: 100%;
      width: 100%;
      background-color: rgba(255, 255, 255, .6);
    }
}
</style>
