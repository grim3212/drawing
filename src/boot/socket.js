import io from 'socket.io-client'
export default async ({ Vue }) => {
  Vue.prototype.$socket = null

  Vue.prototype.$socketConnect = async opts => {
    if (!Vue.prototype.$socket) {
      Vue.prototype.$socket = await io('localhost:5052', {
        query: {
          ...opts
        }
      })

      Vue.prototype.$socket.on('kicked', ({ reason }) => {
        console.log(`player was kicked for ${reason}`)
        Vue.prototype.$socket = null
      })
    } else {
      console.log('already connected')
    }
  }

  Vue.prototype.$createLobby = async opts => {
    if (!Vue.prototype.$socket) {
      Vue.prototype.$socket = await io('localhost:5052', {
        query: {
          ...opts
        }
      })
    } else {
      console.log('already connected to socket')
    }
  }
}
