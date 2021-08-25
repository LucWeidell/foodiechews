import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard, authSettled } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage'),
    beforeEnter: authSettled

  },
  {
    path: '/profile/:id/myRestaurants',
    name: 'FeedPage',
    component: loadPage('FeedPage'),
    beforeEnter: authGuard
  },
  {
    path: '/profile/:id/restaurantDetails/:yelpId',
    name: 'RestaurantsDetails',
    component: loadPage('RestaruantDetailsPage'),
    beforeEnter: authSettled
  },
  {
    path: '/profile/:id/search',
    name: 'SearchPage',
    component: loadPage('SearchPage'),
    beforeEnter: authSettled
  },
  {
    path: '/about',
    name: 'About',
    component: loadPage('HomePage')
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: loadPage('ProfilePage'),
    beforeEnter: authGuard

  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  },
  {
    path: '/settings',
    name: 'Settings',
    component: loadPage('SettingsPage'),
    beforeEnter: authGuard
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
