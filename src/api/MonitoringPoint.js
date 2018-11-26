import request from '@/utils/request'

export function getMPData(params) {
  return request({
    url: 'http://202.114.148.160/webapi/api/MonitoringPoints',
    method: 'get',
    params
  })
}
