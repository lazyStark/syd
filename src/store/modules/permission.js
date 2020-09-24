/*
 * @Author: siwenfeng
 * @Date: 2020-07-06 15:47:51
 * @LastEditTime: 2020-09-11 14:09:19
 * @Description: this is ....
 */
import { constantRoutes } from '@/router'
import Layout from '@/layout/index'

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, accessedRoutes) {
    return new Promise((resolve, reject) => {
      commit('SET_ROUTES', accessedRoutes)
      resolve()
    })
  }
}
export function filterAsyncRouter(router, path = '') {
  path = path + '/'
  const routeArr = []
  router.map(v => {
    let route = {}
    if (v.component) {
      if (v.component === 'Layout') {
        route.component = Layout
      } else {
        const component = v.component
        route.component = loadView(component)
      }
      route = Object.assign(formateKey({
        component: route.component,
        name: v.name,
        path: path + v.path,
        redirect: v.redirect,
        alwaysShow: v.alwaysShow,
        hidden: v.hidden
      }), {
        meta: formateKey({
          title: v.title,
          icon: v.icon,
          noCache: v.noCache,
          menuPid: v.menuPid
        })
      })
      if (v.children && v.children.length) {
        route.children = filterAsyncRouter(v.children, route.path)
      }
      routeArr.push(route)
    }
    return v
  })
  return routeArr
}

function formateKey(v) {
  Object.keys(v).forEach((key) => {
    if (v[key] === null) {
      delete v[key]
    }
  })
  return v
}

export const loadView = (view) => {
  return (resolve) => require([`@/views/${view}`], resolve)
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
