const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue'),
        children: [
          {
            path: '',
            component: () => import('pages/forms/JoinGame.vue')
          },
          {
            path: 'create',
            component: () => import('pages/forms/CreateGame.vue')
          }
        ]
      },
      {
        path: 'playing',
        component: () => import('pages/playing/Playing.vue')
      },
      {
        path: 'hosting',
        component: () => import('pages/hosting/Hosting.vue'),
        children: [
          {
            path: '',
            component: () => import('pages/hosting/Lobby.vue')
          }
        ]
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
