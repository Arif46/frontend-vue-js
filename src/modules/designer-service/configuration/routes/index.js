const childRoutes = (prop) => [
  {
    path: 'home',
    name: prop + '.home',
    meta: { auth: true, name: 'Editable' },
    component: () => import('../pages/template-one/List.vue')
  }
]
const routes = [
  {
    path: '/designer-service/configuration',
    name: 'designer_service.configuration',
    component: () => import('@/layouts/DesignerLayout.vue'),
    // meta: { auth: true },
    children: childRoutes('designer_service.configuration')
  }
]

export default routes
