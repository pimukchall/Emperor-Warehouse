import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _4587b5e2 = () => interopDefault(import('..\\pages\\admin\\customer\\index.vue' /* webpackChunkName: "pages/admin/customer/index" */))
const _0e344c5b = () => interopDefault(import('..\\pages\\admin\\department\\index.vue' /* webpackChunkName: "pages/admin/department/index" */))
const _757c7f8e = () => interopDefault(import('..\\pages\\admin\\equipment\\index.vue' /* webpackChunkName: "pages/admin/equipment/index" */))
const _756be224 = () => interopDefault(import('..\\pages\\admin\\home\\index.vue' /* webpackChunkName: "pages/admin/home/index" */))
const _208688d8 = () => interopDefault(import('..\\pages\\admin\\location\\index.vue' /* webpackChunkName: "pages/admin/location/index" */))
const _75aca2fa = () => interopDefault(import('..\\pages\\admin\\log\\index.vue' /* webpackChunkName: "pages/admin/log/index" */))
const _ffca5a1c = () => interopDefault(import('..\\pages\\admin\\notebook\\index.vue' /* webpackChunkName: "pages/admin/notebook/index" */))
const _26fc7cf4 = () => interopDefault(import('..\\pages\\admin\\store\\index.vue' /* webpackChunkName: "pages/admin/store/index" */))
const _665a66fc = () => interopDefault(import('..\\pages\\admin\\user\\index.vue' /* webpackChunkName: "pages/admin/user/index" */))
const _f21ffb32 = () => interopDefault(import('..\\pages\\auth\\login.vue' /* webpackChunkName: "pages/auth/login" */))
const _db0eadd6 = () => interopDefault(import('..\\pages\\auth\\register.vue' /* webpackChunkName: "pages/auth/register" */))
const _5fc9d3b3 = () => interopDefault(import('..\\pages\\auth\\register-user.vue' /* webpackChunkName: "pages/auth/register-user" */))
const _9f6523fc = () => interopDefault(import('..\\pages\\guest\\equipment\\index.vue' /* webpackChunkName: "pages/guest/equipment/index" */))
const _29992785 = () => interopDefault(import('..\\pages\\guest\\home\\index.vue' /* webpackChunkName: "pages/guest/home/index" */))
const _7f6dc809 = () => interopDefault(import('..\\pages\\guest\\notebook\\index.vue' /* webpackChunkName: "pages/guest/notebook/index" */))
const _a9e3673a = () => interopDefault(import('..\\pages\\super\\customer\\index.vue' /* webpackChunkName: "pages/super/customer/index" */))
const _9fcc22a2 = () => interopDefault(import('..\\pages\\super\\department\\index.vue' /* webpackChunkName: "pages/super/department/index" */))
const _9c96f936 = () => interopDefault(import('..\\pages\\super\\equipment\\index.vue' /* webpackChunkName: "pages/super/equipment/index" */))
const _b945ff7c = () => interopDefault(import('..\\pages\\super\\home\\index.vue' /* webpackChunkName: "pages/super/home/index" */))
const _234e9fa8 = () => interopDefault(import('..\\pages\\super\\location\\index.vue' /* webpackChunkName: "pages/super/location/index" */))
const _b9ed7aa2 = () => interopDefault(import('..\\pages\\super\\log\\index.vue' /* webpackChunkName: "pages/super/log/index" */))
const _4decfa46 = () => interopDefault(import('..\\pages\\super\\notebook\\index.vue' /* webpackChunkName: "pages/super/notebook/index" */))
const _5e660a9c = () => interopDefault(import('..\\pages\\super\\store\\index.vue' /* webpackChunkName: "pages/super/store/index" */))
const _aa348454 = () => interopDefault(import('..\\pages\\super\\user\\index.vue' /* webpackChunkName: "pages/super/user/index" */))
const _7659aabb = () => interopDefault(import('..\\pages\\user\\department\\index.vue' /* webpackChunkName: "pages/user/department/index" */))
const _6dc715d9 = () => interopDefault(import('..\\pages\\user\\equipment\\index.vue' /* webpackChunkName: "pages/user/equipment/index" */))
const _12edb54e = () => interopDefault(import('..\\pages\\user\\home\\index.vue' /* webpackChunkName: "pages/user/home/index" */))
const _0d2fff38 = () => interopDefault(import('..\\pages\\user\\location\\index.vue' /* webpackChunkName: "pages/user/location/index" */))
const _6cc44952 = () => interopDefault(import('..\\pages\\user\\notebook\\index.vue' /* webpackChunkName: "pages/user/notebook/index" */))
const _5352e726 = () => interopDefault(import('..\\pages\\user\\store\\index.vue' /* webpackChunkName: "pages/user/store/index" */))
const _1c0670e2 = () => interopDefault(import('..\\pages\\admin\\customer\\create.vue' /* webpackChunkName: "pages/admin/customer/create" */))
const _d4f99ec8 = () => interopDefault(import('..\\pages\\admin\\customer\\profile\\index.vue' /* webpackChunkName: "pages/admin/customer/profile/index" */))
const _3fecec7a = () => interopDefault(import('..\\pages\\admin\\department\\create.vue' /* webpackChunkName: "pages/admin/department/create" */))
const _0aaa91a5 = () => interopDefault(import('..\\pages\\admin\\equipment\\create.vue' /* webpackChunkName: "pages/admin/equipment/create" */))
const _6ea884b2 = () => interopDefault(import('..\\pages\\admin\\equipment\\profile\\index.vue' /* webpackChunkName: "pages/admin/equipment/profile/index" */))
const _17fedce6 = () => interopDefault(import('..\\pages\\admin\\location\\create.vue' /* webpackChunkName: "pages/admin/location/create" */))
const _aa1853e8 = () => interopDefault(import('..\\pages\\admin\\notebook\\create.vue' /* webpackChunkName: "pages/admin/notebook/create" */))
const _ea131bce = () => interopDefault(import('..\\pages\\admin\\notebook\\profile\\index.vue' /* webpackChunkName: "pages/admin/notebook/profile/index" */))
const _692a8c10 = () => interopDefault(import('..\\pages\\admin\\store\\create.vue' /* webpackChunkName: "pages/admin/store/create" */))
const _74763a89 = () => interopDefault(import('..\\pages\\admin\\user\\profile\\index.vue' /* webpackChunkName: "pages/admin/user/profile/index" */))
const _2f194909 = () => interopDefault(import('..\\pages\\guest\\equipment\\profile\\index.vue' /* webpackChunkName: "pages/guest/equipment/profile/index" */))
const _387f723c = () => interopDefault(import('..\\pages\\guest\\notebook\\profile\\index.vue' /* webpackChunkName: "pages/guest/notebook/profile/index" */))
const _4320ea8a = () => interopDefault(import('..\\pages\\super\\customer\\create.vue' /* webpackChunkName: "pages/super/customer/create" */))
const _e773f070 = () => interopDefault(import('..\\pages\\super\\customer\\profile\\index.vue' /* webpackChunkName: "pages/super/customer/profile/index" */))
const _7ad831ef = () => interopDefault(import('..\\pages\\super\\department\\create.vue' /* webpackChunkName: "pages/super/department/create" */))
const _a6df980e = () => interopDefault(import('..\\pages\\super\\equipment\\create.vue' /* webpackChunkName: "pages/super/equipment/create" */))
const _50409306 = () => interopDefault(import('..\\pages\\super\\equipment\\profile\\index.vue' /* webpackChunkName: "pages/super/equipment/profile/index" */))
const _0471a012 = () => interopDefault(import('..\\pages\\super\\location\\create.vue' /* webpackChunkName: "pages/super/location/create" */))
const _d132cd90 = () => interopDefault(import('..\\pages\\super\\notebook\\create.vue' /* webpackChunkName: "pages/super/notebook/create" */))
const _fc8d6d76 = () => interopDefault(import('..\\pages\\super\\notebook\\profile\\index.vue' /* webpackChunkName: "pages/super/notebook/profile/index" */))
const _7086a64c = () => interopDefault(import('..\\pages\\super\\store\\create.vue' /* webpackChunkName: "pages/super/store/create" */))
const _d388f096 = () => interopDefault(import('..\\pages\\super\\user\\profile\\index.vue' /* webpackChunkName: "pages/super/user/profile/index" */))
const _c78cf9dc = () => interopDefault(import('..\\pages\\user\\equipment\\profile\\index.vue' /* webpackChunkName: "pages/user/equipment/profile/index" */))
const _421c27b9 = () => interopDefault(import('..\\pages\\user\\notebook\\profile\\index.vue' /* webpackChunkName: "pages/user/notebook/profile/index" */))
const _0917c029 = () => interopDefault(import('..\\pages\\user\\user\\profile\\index.vue' /* webpackChunkName: "pages/user/user/profile/index" */))
const _01865810 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/admin/customer",
    component: _4587b5e2,
    name: "admin-customer"
  }, {
    path: "/admin/department",
    component: _0e344c5b,
    name: "admin-department"
  }, {
    path: "/admin/equipment",
    component: _757c7f8e,
    name: "admin-equipment"
  }, {
    path: "/admin/home",
    component: _756be224,
    name: "admin-home"
  }, {
    path: "/admin/location",
    component: _208688d8,
    name: "admin-location"
  }, {
    path: "/admin/log",
    component: _75aca2fa,
    name: "admin-log"
  }, {
    path: "/admin/notebook",
    component: _ffca5a1c,
    name: "admin-notebook"
  }, {
    path: "/admin/store",
    component: _26fc7cf4,
    name: "admin-store"
  }, {
    path: "/admin/user",
    component: _665a66fc,
    name: "admin-user"
  }, {
    path: "/auth/login",
    component: _f21ffb32,
    name: "auth-login"
  }, {
    path: "/auth/register",
    component: _db0eadd6,
    name: "auth-register"
  }, {
    path: "/auth/register-user",
    component: _5fc9d3b3,
    name: "auth-register-user"
  }, {
    path: "/guest/equipment",
    component: _9f6523fc,
    name: "guest-equipment"
  }, {
    path: "/guest/home",
    component: _29992785,
    name: "guest-home"
  }, {
    path: "/guest/notebook",
    component: _7f6dc809,
    name: "guest-notebook"
  }, {
    path: "/super/customer",
    component: _a9e3673a,
    name: "super-customer"
  }, {
    path: "/super/department",
    component: _9fcc22a2,
    name: "super-department"
  }, {
    path: "/super/equipment",
    component: _9c96f936,
    name: "super-equipment"
  }, {
    path: "/super/home",
    component: _b945ff7c,
    name: "super-home"
  }, {
    path: "/super/location",
    component: _234e9fa8,
    name: "super-location"
  }, {
    path: "/super/log",
    component: _b9ed7aa2,
    name: "super-log"
  }, {
    path: "/super/notebook",
    component: _4decfa46,
    name: "super-notebook"
  }, {
    path: "/super/store",
    component: _5e660a9c,
    name: "super-store"
  }, {
    path: "/super/user",
    component: _aa348454,
    name: "super-user"
  }, {
    path: "/user/department",
    component: _7659aabb,
    name: "user-department"
  }, {
    path: "/user/equipment",
    component: _6dc715d9,
    name: "user-equipment"
  }, {
    path: "/user/home",
    component: _12edb54e,
    name: "user-home"
  }, {
    path: "/user/location",
    component: _0d2fff38,
    name: "user-location"
  }, {
    path: "/user/notebook",
    component: _6cc44952,
    name: "user-notebook"
  }, {
    path: "/user/store",
    component: _5352e726,
    name: "user-store"
  }, {
    path: "/admin/customer/create",
    component: _1c0670e2,
    name: "admin-customer-create"
  }, {
    path: "/admin/customer/profile",
    component: _d4f99ec8,
    name: "admin-customer-profile"
  }, {
    path: "/admin/department/create",
    component: _3fecec7a,
    name: "admin-department-create"
  }, {
    path: "/admin/equipment/create",
    component: _0aaa91a5,
    name: "admin-equipment-create"
  }, {
    path: "/admin/equipment/profile",
    component: _6ea884b2,
    name: "admin-equipment-profile"
  }, {
    path: "/admin/location/create",
    component: _17fedce6,
    name: "admin-location-create"
  }, {
    path: "/admin/notebook/create",
    component: _aa1853e8,
    name: "admin-notebook-create"
  }, {
    path: "/admin/notebook/profile",
    component: _ea131bce,
    name: "admin-notebook-profile"
  }, {
    path: "/admin/store/create",
    component: _692a8c10,
    name: "admin-store-create"
  }, {
    path: "/admin/user/profile",
    component: _74763a89,
    name: "admin-user-profile"
  }, {
    path: "/guest/equipment/profile",
    component: _2f194909,
    name: "guest-equipment-profile"
  }, {
    path: "/guest/notebook/profile",
    component: _387f723c,
    name: "guest-notebook-profile"
  }, {
    path: "/super/customer/create",
    component: _4320ea8a,
    name: "super-customer-create"
  }, {
    path: "/super/customer/profile",
    component: _e773f070,
    name: "super-customer-profile"
  }, {
    path: "/super/department/create",
    component: _7ad831ef,
    name: "super-department-create"
  }, {
    path: "/super/equipment/create",
    component: _a6df980e,
    name: "super-equipment-create"
  }, {
    path: "/super/equipment/profile",
    component: _50409306,
    name: "super-equipment-profile"
  }, {
    path: "/super/location/create",
    component: _0471a012,
    name: "super-location-create"
  }, {
    path: "/super/notebook/create",
    component: _d132cd90,
    name: "super-notebook-create"
  }, {
    path: "/super/notebook/profile",
    component: _fc8d6d76,
    name: "super-notebook-profile"
  }, {
    path: "/super/store/create",
    component: _7086a64c,
    name: "super-store-create"
  }, {
    path: "/super/user/profile",
    component: _d388f096,
    name: "super-user-profile"
  }, {
    path: "/user/equipment/profile",
    component: _c78cf9dc,
    name: "user-equipment-profile"
  }, {
    path: "/user/notebook/profile",
    component: _421c27b9,
    name: "user-notebook-profile"
  }, {
    path: "/user/user/profile",
    component: _0917c029,
    name: "user-user-profile"
  }, {
    path: "/",
    component: _01865810,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
