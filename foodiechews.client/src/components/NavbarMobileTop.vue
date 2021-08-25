<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between">
    <div class="text-center col-2">
      <router-link :to="{ name: 'About' }" class="nav-link">
        <img src="../assets/img/foodieLogo.png" alt="foodie-logo">
      </router-link>
    </div>
    <div class="text-center col-8 hoverable">
      <div v-if="state.account.activeLocation">
        <div class="btn-group">
          <button type="button"
                  class="btn-secondary dropdown-toggle"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
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
      class="navbar-toggler col-2"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link :to="{ name: 'About' }" class="nav-link">
            About
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'Profile', params: {id: user.id} }" class="nav-link">
            My Profile
          </router-link>
        </li>
      </ul>
      <span class="navbar-text">
        <button
          class="btn btn-outline-light text-uppercase"
          @click="login"
          v-if="!user.isAuthenticated"
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
            <router-link :to="{ name: 'Account' }">
              <div class="list-group-item list-group-item-action hoverable">
                Account
              </div>
            </router-link>
            <router-link :to="{ name: 'Settings' }">
              <div class="list-group-item list-group-item-action hoverable">
                Settings
              </div>
            </router-link>
            <div
              class="list-group-item list-group-item-action hoverable"
              @click="logout"
            >
              logout
            </div>
          </div>
        </div>
      </span>
    </div>
  </nav>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed, reactive } from 'vue'
export default {
  setup() {
    const state = reactive({
      dropOpen: false,
      account: computed(() => AppState.account),
      nonLoggedLoc: computed(() => AppState.activeLocation)
    })
    return {
      state,
      user: computed(() => AppState.user),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style scoped>
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
  max-height: 35px;
  max-width:35px;
}
</style>
