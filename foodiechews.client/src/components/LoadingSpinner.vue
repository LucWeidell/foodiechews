<template>
  <div class="container-fluid">
    <div class="row justify-content-center align-items-center" style="min-height: 80vh">
      <div class="col-6 text-center">
        <div class="lds-ring">
          <div></div><div></div><div></div><div></div>
        </div>
        <h2>Loading results...</h2>
        <small>Powered By <img src="src/assets/yelp/yelp_logos/Logo/Light bg/RGB/yelp_logo.svg" class="yelp" alt="yelp logo"></small>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.yelp{
    max-height: 8vh;
    max-width: 8vh;
  }
</style>
