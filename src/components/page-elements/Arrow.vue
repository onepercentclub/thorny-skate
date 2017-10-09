<template>
  <div class="arrow">

  </div>
</template>

<style scoped lang="scss">

@keyframes lift {
  0% {
    transform: translateY(-15px);
  }

  50% {
    transform: translateY(30px);
  }

  100% {
    transform: translateY(-15px);
  }
}

.arrow {
  animation: lift 2s infinite;

  &:before {
  	bottom: 100%;
  	left: 50%;
  	border: solid transparent;
  	content: " ";
  	height: 0;
  	width: 0;
  	position: absolute;
  	pointer-events: none;
  	border-color: rgba(136, 183, 213, 0);
  	border-bottom-color: #fff;
  	border-width: 7px;
  	margin-left: -10px;
    margin-bottom: 20px;
  }

  &:after {
    top: 100%;
  	left: 50%;
  	border: solid transparent;
  	content: " ";
  	height: 0;
  	width: 0;
  	position: absolute;
  	pointer-events: none;
  	border-color: rgba(136, 183, 213, 0);
  	border-top-color: #fff;
  	border-width: 7px;
  	margin-left: -10px;
  }
}

@media (min-width: 500px) {
  .arrow {
    display: none;
  }
}

@media (min-width: 1000px) {
  .arrow {
    &:before {
    	border-width: 14px;
    }

    &:after {
    	border-width: 14px;
    }
  }
}

</style>
