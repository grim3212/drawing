import io from 'socket.io-client'
import { Notify } from 'quasar'

class SocketWrapper {
  constructor({ store, router }) {
    this.socket = null
    this.store = store
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
      this.socket.on('created', ({ room }) => {
        this.router.push('hosting')
        this.store.commit('controller/setRoom', room)
      })
      this.socket.on('playerJoined', ({ player }) => {
        this.store.commit('controller/addPlayer', player)
      })
      this.socket.on('playerLeft', ({ id }) => {
        this.store.commit('controller/removePlayer', id)
      })
    } else {
      console.log('already connected to socket')
    }
  }
}

export default SocketWrapper
