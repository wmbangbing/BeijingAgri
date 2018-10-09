/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const nestedRouter = {
  path: '/envParam',
  component: Layout,
  redirect: '/envParam/meteoParam/rainfall',
  name: 'EnvParam',
  meta: {
    title: '环境参数',
    icon: 'env'
  },
  children: [
    {
      path: 'meteoParam',
      component: () => import('@/views/envParam/meteoParam/index'), // Parent router-view
      name: 'MeteoParam',
      meta: { title: '气象参数',icon:'meteorological' },
      redirect: '/envParam/meteoParam/rainfall',
      children: [
        {
          path: 'rainfall',
          component: () => import('@/views/envParam/meteoParam/rainfall'),
          name: 'Rainfall',
          meta: { title: '降雨量',icon:'rainfall' }
        },      
        {
          path: 'temp',
          component: () => import('@/views/envParam/meteoParam/temp'),
          name: 'Temp',
          meta: { title: '气温',icon:'temp' }
        },      
        {
          path: 'illumination',
          component: () => import('@/views/envParam/meteoParam/illumination'),
          name: 'Illumination',
          meta: { title: '光照',icon:'illumination' }
        },      
        {
          path: 'radiationAmount',
          component: () => import('@/views/envParam/meteoParam/radiationAmount'),
          name: 'RadiationAmount',
          meta: { title: '辐射量',icon:'radiationAmount' }
        },      
        {
          path: 'windPower',
          component: () => import('@/views/envParam/meteoParam/windPower'),
          name: 'WindPower',
          meta: { title: '风力',icon:'wind' }
        }
      ]
    },
    {
      path: '/soilParam',
      component: () => import('@/views/envParam/soilParam/index'),
      redirect: '/envParam/soilParam/nutrient',
      name: 'SoilParam',
      meta: {
        title: '土壤参数',
        icon: 'soil'
      },
      children: [
        {
          path: 'nutrient',
          component: () => import('@/views/envParam/soilParam/nutrient'),
          name: 'Nutrient',
          meta: { title: '养分含量',icon: 'nutrient' }
        },
        {
          path: 'organicMatter',
          component: () => import('@/views/envParam/soilParam/organicMatter'),
          name: 'OrganicMatter',
          meta: { title: '有机质',icon: 'organicMatter' }
        },
        {
          path: 'soilMoisture',
          component: () => import('@/views/envParam/soilParam/soilMoisture'),
          name: 'SoilMoisture',
          meta: { title: '土壤湿度',icon: 'soilMoisture'}
        }
      ]
    }
  ]
}

export default nestedRouter
