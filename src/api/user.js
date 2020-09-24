/*
 * @Author: siwenfeng
 * @Date: 2020-07-06 15:47:51
 * @LastEditTime: 2020-09-11 15:37:43
 * @Description: this is ....
 */
import request from '@/utils/request'
// import routesMenu from './routesTree'

export function login(data) {
  return request({
    url: '/vue-element-admin/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

export function topRoutes() {
  return request({
    url: '/user/getTopRoutes',
    method: 'get'
  })
}

