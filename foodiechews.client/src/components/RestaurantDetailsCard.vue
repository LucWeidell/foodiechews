<template>
  <div class="row justify-content-center mt-3 text-dark">
    <div class="col-md-11 col-11">
      <h4>Location Name</h4>
    </div>
    <div class="col-10 d-flex justify-content-center">
      <img src="../assets/img/mcdonald-s.jpg" alt="restaruantImage" width="250" class="shadow">
    </div>
    <div class="col-md-11 col-11 mt-3">
      <h5>Details:</h5>
    </div>
    <div class="col-md-11 col-9 mt-3">
      <p>They got the burger</p>
    </div>
    <div class="col-md-11 col-11 mt-3">
      <h5>Hours:</h5>
    </div>
    <div class="col-md-10 col-9 mt-3 d-flex justify-content-center">
      <p>5am - 12am</p>
    </div>
    <BRGbuttons />
  </div>
</template>

<script>
export default {
  name: 'RestaurantDetailsCard',
  setup() {

  }
}
</script>
