<template>
  <div class="container-fluid">
    <div class="row" id="cover-img">
      <img :src="state.account.picture || 'https://via.placeholder.com/150'" alt="Profile Pic" class="ml-3 rounded-circle profile-img">
    </div>
    <div class="row mt-5">
      <div class="card col-12 shadow">
        <div class="card-body">
          <h5 class="card-title">
            {{ state.account.name }}
          </h5>
          <p class="card-text">
            {{ state.account.bio }}
          </p>
        </div>
        <div class="pb-2">
          <button type="button" class="btn-sm btn-secondary" data-toggle="modal" data-target="#editModal">
            Edit
          </button>
        </div>
      </div>
    </div>
    <LocationCard v-for="l in locations" :key="l._id" :location="l" />
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
                <input type="text" v-model="state.account.bio" class="form-control" id="bio" placeholder="Tell us About you...">
              </div>
              <div class="form-group">
                <label for="profileImg">Profile Picture</label>
                <input type="text" v-model="state.account.picture" class="form-control" id="profileImg" placeholder="Your new look...">
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
import { computed, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService'

export default {
  name: 'Profile',
  setup() {
    const state = reactive({
      account: computed(() => AppState.account)
    })
    return {
      state,
      locations: computed(() => AppState.account.location),
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
</style>
