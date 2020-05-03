import io from 'socket.io-client'
import { Notify } from 'quasar'

class SocketWrapper {
  constructor({ store, router }) {
    this.socket = null
    this.store = store
    this.router = router
  }

  connected = () => this.socket !== null

  /*
   * =========================
   * START: Controller functions
   * =========================
   */

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
        this.router.push({ name: 'lobby' })
        this.store.commit('controller/setRoom', room)
      })
      this.socket.on('playerJoined', ({ player }) => {
        this.store.commit('controller/addPlayer', player)
      })
      this.socket.on('playerLeft', ({ id }) => {
        this.store.commit('controller/removePlayer', id)
      })
      this.socket.on('gameStarted', () => {
        this.router.push({ name: 'round' })
      })
      this.socket.on('newGuess', data => {
        this.store.commit('controller/addGuess', data)
      })
    } else {
      console.log('already connected to socket')
    }
  }

  startGame = async () => {
    if (!this.socket) {
      console.error('socket not connected')
    } else {
      this.socket.emit('startGame')
    }
  }

  /*
   * =========================
   * END: Controller functions
   * =========================
   */

  /*
   * =========================
   * START: Player functions
   * =========================
   */

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
      this.socket.on('joined', ({ id }) => {
        this.store.commit('player/setId', id)
        this.router.push({ name: 'playing' })
      })
      this.socket.on('gameStarted', () => {
        this.router.push({ name: 'guessing' })
      })
      this.socket.on('newGuess', data => {
        this.store.commit('player/addGuess', data)
      })
    } else {
      console.log('already connected')
    }
  }

  playerDraw = async data => {
    if (!this.socket) {
      console.error('socket not connected')
    } else {
      this.socket.emit('drawing', data)
    }
  }

  sendGuess = async data => {
    if (!this.socket) {
      console.error('socket not connected')
    } else {
      this.socket.emit('newGuess', data)
    }
  }

  /*
   * =========================
   * END: Player functions
   * =========================
   */
}

export default SocketWrapper
