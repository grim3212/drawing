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
            name: 'join',
            component: () => import('pages/forms/JoinGame.vue')
          },
          {
            path: 'create',
            name: 'create',
            component: () => import('pages/forms/CreateGame.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/playing',
    component: () => import('layouts/PlayerLayout.vue'),
    children: [
      {
        path: 'waiting',
        name: 'waiting',
        component: () => import('pages/playing/Waiting.vue')
      },
      {
        path: 'drawing',
        name: 'drawing',
        component: () => import('pages/playing/Drawing.vue')
      },
      {
        path: 'guessing',
        name: 'guessing',
        component: () => import('pages/playing/Guessing.vue')
      }
    ]
  },
  {
    path: '/hosting',
    component: () => import('layouts/DisplayLayout.vue'),
    children: [
      {
        path: '',
        name: 'lobby',
        component: () => import('pages/hosting/Lobby.vue')
      },
      {
        path: 'round',
        name: 'round',
        component: () => import('pages/hosting/Round.vue')
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
