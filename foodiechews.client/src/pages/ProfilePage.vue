<template>
  <div class="container-fluid" id="gradient">
    <div class="row" id="cover-img">
      <img :src="state.account.picture || 'https://via.placeholder.com/150'" alt="Profile Pic" class="ml-3 rounded-circle profile-img">
    </div>
    <div class="row mt-5" style="justify-content: center">
      <div class="card col-10 shadow">
        <div class="card-body py-2 px-1">
          <h5 class="card-title my-2 text-primary" style="text-shadow: 1px 1px grey">
            {{ state.account.name }}
          </h5>
          <p>{{ state.account.email }}</p>
          <p class="text-dark">
            <b>Bio:</b>
            {{ state.account.bio }}
          </p>
        </div>
      </div>
      <div class="col-10 d-flex" style="justify-content: space-between">
        <div>
          <i class="mdi mdi-48px mdi-facebook"></i>&nbsp;
          <i class="mdi mdi-48px mdi-twitter"></i>&nbsp;
          <i class="mdi mdi-48px mdi-instagram"></i>
        </div>
        <div class="p-2">
          <button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#editModal">
            Edit
          </button>
        </div>
      </div>
    </div>
    <LocationCard v-for="l in locations" :key="l.id" :location="l" />
  </div>

  <!-- Modal -->
  <div class="modal fade"
       id="editModal"
       tabindex="-1"
       role="dialog"
       aria-labelledby="editModal"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Your New Account Info
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="post-form from-row">
            <form>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="name">Username</label>
                  <input type="text" v-model="state.account.name" class="form-control" id="name" placeholder="Username...">
                </div>
                <div class="form-group col-md-6">
                  <label for="email">Email</label>
                  <input type="email" v-model="state.account.email" class="form-control" id="email" placeholder="Your Email...">
                </div>
              </div>
              <div class="form-group">
                <label for="bio">Bio</label>
                <input type="text"
                       maxlength="150"
                       v-model="state.account.bio"
                       class="form-control"
                       id="bio"
                       placeholder="Tell us About you..."
                >
              </div>
              <div class="form-group">
                <label for="profileImg">Profile Picture</label>
                <input type="text" v-model="state.account.picture" class="form-control" id="profileImg" placeholder="Your new look...">
              </div>
              <div class="form-group">
                <label for="twitter">Twitter</label>
                <input type="text"
                       class="form-control"
                       id="twitter"
                       placeholder="https://www.twitter.com/Your Name Here"
                >
              </div>
              <div class="form-group">
                <label for="facebook">Facebook</label>
                <input type="text"
                       class="form-control"
                       id="facebook"
                       placeholder="https://www.facebook.com/Your Name Here"
                >
              </div>
              <div class="form-group">
                <label for="Instagram">Instagram</label>
                <input type="text"
                       class="form-control"
                       id="instagram"
                       placeholder="https://www.instagram.com/Your Name Here"
                >
              </div>
              <!-- <div class="form-group">
                <label for="coverImg">Cover Picture</label>
                <input type="text" v-model="state.account.coverImg" class="form-control" id="coverImg" placeholder="Your new background image...">
              </div> -->
            </form>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="editAccount(state.account)">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService'
import { profileService } from '../services/ProfileService'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger'

export default {
  name: 'Profile',
  setup() {
    function getAll(myRest) {
      const all = myRest
      const places = []
      for (let i = 0; i < all.length; i++) {
        const foundItem = all[i]
        if (!places.find(l => (l.location.city === foundItem.location.city && l.location.state === foundItem.location.state))) {
          places.push(foundItem)
          // logger.log('Pushed FoundItem : ', foundItem)
        }
        AppState.allRest = places
      }
    }
    const route = useRoute()
    onMounted(async() => {
      await profileService.getRestByProfileId(route.params.id)
      logger.log('Words', AppState.profileDetails)
      getAll(AppState.profileDetails)
    })
    const state = reactive({
      account: computed(() => AppState.account)
    })
    return {
      state,
      locations: computed(() => AppState.allRest),
      async editAccount(rawAccount) {
        await accountService.editAccount(rawAccount)
        $('#editModal').modal('hide')
      }
    }
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
.profile-img{
  max-height: 100px;
  min-height: 100px;
  max-width: 100px;
  position: relative;
  bottom: -7vh;
  z-index: 1;
}
#gradient{
  background: #bdc3c7;  /* fallback for old browsers */
background: -webkit-linear-gradient(to bottom,#bdc3c7, #2c3e50);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to bottom,#bdc3c7, #2c3e50); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}

</style>
