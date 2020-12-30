import request from '../request.js';

// ! 国家编码列表
export function fetchCountryListApi() {
  return request({
    url: '/countries/code/list',
    method: 'get',
  })
}

// ! 检测手机号码是否已注册
export function checkPhoneExitApi(params) {
  return request({
    url: '/cellphone/existence/check',
    method: 'get',
    params:params
  })
}

// ! 手机登录
export function loginPhoneApi(params) {
  return request({
    url: '/login/cellphone',
    method: 'get',
    params:params
  })
}

// ! 退出登录
export function logoutApi() {
  return request({
    url: '/logout',
    method: 'get'
  })
}