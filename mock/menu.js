/*
 * @Author: siwenfeng
 * @Date: 2020-07-06 17:41:56
 * @LastEditTime: 2020-09-17 15:26:34
 * @Description: this is ....
 */
const top = [
  {
    'row': 13,
    'menuId': '003001003',
    'menuPid': '003003',
    'name': 'monitorMap',
    'path': 'monitorMap',
    'hidden': false,
    'redirect': null,
    'component': 'Layout',
    'alwaysShow': false,
    'title': null,
    'icon': 'monitorMap',
    'noCache': true,
    'children': [
      {
        'row': 13,
        'menuId': '003001003',
        'menuPid': '003003',
        'name': 'monitorMap',
        'path': 'monitorMap',
        'hidden': false,
        'redirect': null,
        'component': 'support/index',
        'alwaysShow': true,
        'title': '一级页面1',
        'icon': 'monitorMap',
        'noCache': true
      }
    ]
  },
  {
    'row': 11,
    'menuId': '004001',
    'menuPid': '004',
    'name': 'dangerRisk',
    'path': 'danger',
    'hidden': false,
    'redirect': null,
    'component': 'Layout',
    'alwaysShow': true,
    'title': '一级页面2',
    'icon': 'day',
    'noCache': true,
    'children': [
      {
        'row': 18,
        'menuId': '004001001',
        'menuPid': '004001',
        'name': 'dangerRiskMan',
        'path': 'dangerRiskMan',
        'hidden': false,
        'redirect': null,
        'component': 'informange/index',
        'alwaysShow': false,
        'title': '二级页面1',
        'icon': 'dangerRisk',
        'noCache': true
      },
      {
        'row': 181,
        'menuId': '004001004',
        'menuPid': '004001',
        'name': 'riskStorage',
        'path': 'riskStorage',
        'hidden': false,
        'redirect': null,
        'component': 'informange/daySupport',
        'alwaysShow': false,
        'title': '二级页面2',
        'icon': 'riskStorage',
        'noCache': true
      }
    ]
  },
  {
    'row': 10,
    'menuId': '004002',
    'menuPid': '004',
    'name': 'riskPromise',
    'path': 'riskPromise',
    'hidden': false,
    'redirect': null,
    'component': 'Layout',
    'alwaysShow': true,
    'title': '一级页面3',
    'icon': 'riskPromise',
    'noCache': true,
    'children': [
      {
        'row': 15,
        'menuId': '004002001',
        'menuPid': '004002',
        'name': 'netWork',
        'path': 'netWork',
        'hidden': false,
        'redirect': null,
        'component': 'informange/riskPromise',
        'alwaysShow': false,
        'title': '二级页面1',
        'icon': 'netWork',
        'noCache': true
      }
    ]
  }
]

module.exports = [

  // user logout
  {
    url: '/user/getTopRoutes',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: top
      }
    }
  }
]
