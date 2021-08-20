<template>
  <div class="container-fluid">
    <div class="row" id="cover-img">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  setup() {

  }
}
</script>

<style lang="scss" scoped>

#cover-img{
  background-image: url('../assets/img/cover-img.jpg');
  background-position: center;
  background-size: cover;
  min-height: 15vh;
  min-width: 100vw;
}
</style>
