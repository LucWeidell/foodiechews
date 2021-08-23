<template>
  <div class="container-fluid" id="bg-img">
  </div>
</template>

<script>
export default {
  name: 'MyRestaurants',
  setup() {
  }
}
</script>

<style lang="scss" scoped>
#bg-img{
  background-image: url('../assets/img/MyRestBackground.png');
  background-position: center;
  background-size: cover;
}
@media only screen and (min-width: 770px) {
  #bg-img {
    background-image: url('https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1867&q=80');
    background-size: cover;
    background-position: center;
  }
}
</style>
