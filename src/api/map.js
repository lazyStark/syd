import request from '@/utils/request'
// import routesMenu from './routesTree'

export function getPoint() {
  return request({
    url: '/point/all',
    method: 'get'
  })
}
