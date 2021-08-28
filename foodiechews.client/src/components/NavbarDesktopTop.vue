<template>
  <nav class="NavBarDesktop navbar navbar-expand-lg navbar-dark fixed-top bg-primary">
    <div class=" col-3 hoverable">
      <div v-if="state.account.activeLocation">
        <div class="btn-group">
          <button type="button"
                  class="btn-secondary dropdown-toggle"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  title="Change Location"
          >
            {{ state.account.activeLocation.city }}, {{ state.account.activeLocation.state }}
          </button>
          <div class="dropdown-menu">
            <UserCities v-for="l in state.account.location" :key="l" :loc="l" />
          </div>
        </div>
      </div>
      <div v-else>
        {{ state.nonLoggedLoc.city }}, {{ state.nonLoggedLoc.state }}
      </div>
    </div>

    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon justify-content-center" />
    </button>
    <div class="col-1 py-1 border-right border-left border-dark push-left">
      <router-link :to="{name: 'RestaurantsDetails', params: {id: state.account.id, yelpId: 'random'}}">
        <img src="../assets/img/randomRed.png"
             class="p-0 action"
             alt="Random Button"
             title="Random Restaurant"
             width="50"
        >
      </router-link>
    </div>

    <!-- <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <router-link :to="{ name: 'Profile', params: {id: accounts.id} }" class="nav-link">
          My Profile
        </router-link>
      </li>
    </ul> -->

    <!-- <div class="col-1 py-1 push-left">
      <div class="py-1">
        <router-link :to="{name: 'SearchPage', params: {id: state.account.id}}">
          <img src="../assets/img/search.png"
               class="p-0 action"
               title="Search"
               alt="Search Button"
               width="50"
          >
        </router-link>
      </div>
    </div> -->
    <span class="col-2 navbar-text hoverable push-left">
      <button
        class="btn btn-outline-light text-uppercase"
        @click="login"
        v-if="!user.isAuthenticated"
        title="Login"
      >
        Login
      </button>

      <div class="dropdown" v-else>
        <div
          class="dropdown-toggle"
          @click="state.dropOpen = !state.dropOpen"
        >
          <img
            :src="user.picture"
            alt="user photo"
          />
          <span class="mx-3">{{ user.name }}</span>
        </div>
        <div
          class="dropdown-menu p-0 list-group w-100"
          :class="{ show: state.dropOpen }"
          @click="state.dropOpen = false"
        >
          <router-link :to="{ name: 'Profile', params: {id: accounts.id} }">
            <div class="list-group-item list-group-item-action hoverable"
                 title="profile"
            >
              Profile
            </div>
          </router-link>
          <router-link :to="{ name: 'Settings' }">
            <div class="list-group-item list-group-item-action hoverable" title="Settings">
              Settings
            </div>
          </router-link>
          <div
            class="list-group-item list-group-item-action hoverable"
            @click="logout"
            title="Logout"
          >
            logout
          </div>
        </div>
      </div>
    </span>
  </nav>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed, reactive } from 'vue'

export default {
  name: 'NavbarDesktop',
  setup() {
    const state = reactive({
      dropOpen: false,
      account: computed(() => AppState.account),
      nonLoggedLoc: computed(() => AppState.activeLocation)
    })
    return {
      state,
      user: computed(() => AppState.user),
      accounts: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  },
  components: {}
}

</script>

<style lang="scss" scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.nav-link{
  text-transform: uppercase;
}
.nav-item .nav-link.router-link-exact-active{
  color: var(--light);
}

img{
  border-radius: 50%;
  max-height: 50px;
  max-width:50px;
}

.main-nav {
    display: flex;
}

.push-left {
    margin-left: auto;
}
.push-right{
  margin-right: auto;
}
</style>
