import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'http://202.114.148.160/webapi/api/values',
    method: 'get',
    params
  })
}
