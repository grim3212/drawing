import io from 'socket.io-client'
import { Notify } from 'quasar'

class SocketWrapper {
  constructor(router) {
    this.socket = null
    this.router = router
  }

  connected = () => this.socket !== null

  playerJoin = async opts => {
    if (!this.socket) {
      this.socket = await io('localhost:5052', {
        query: {
          handshake: JSON.stringify({ ...opts })
        }
      })
      this.socket.on('kicked', ({ reason }) => {
        Notify.create({
          message: `You've been kicked (${reason})`
        })
        this.socket = null
      })
      this.socket.on('joined', () => {
        this.router.push('playing')
      })
    } else {
      console.log('already connected')
    }
  }

  createLobby = async opts => {
    if (!this.socket) {
      this.socket = await io('localhost:5052', {
        query: {
          handshake: JSON.stringify({ ...opts })
        }
      })
      this.socket.on('kicked', ({ reason }) => {
        Notify.create({
          message: `You've been kicked (${reason})`
        })
        this.socket = null
      })
      this.socket.on('created', () => {})
    } else {
      console.log('already connected to socket')
    }
  }
}

export default SocketWrapper
