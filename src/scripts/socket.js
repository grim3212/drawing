import io from 'socket.io-client'
import { Notify } from 'quasar'
import bus from './bus'

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
      this.socket.on('gameStarted', ({ drawer }) => {
        this.router.push({ name: 'round' })
        this.store.commit('controller/setDrawer', drawer)
        this.store.commit('controller/setGameState', 'PLAYING')
      })
      this.socket.on('newGuess', data => {
        this.store.commit('controller/addGuess', data)
      })
      this.socket.on('updatePlayerState', data => {
        this.store.commit('controller/setPlayer', data)
      })
      this.socket.on('promptChosen', ({ prompt }) => {
        this.store.commit('controller/setPrompt', prompt)
      })
      this.socket.on('timerUpdate', ({ time }) => {
        this.store.commit('controller/setTimer', time)
      })
      this.socket.on('roundEnd', ({ time }) => {
        bus.$emit('roundEnd')
        this.store.commit('controller/setTimer', time)
        this.store.commit('controller/setGameState', 'ROUNDEND')
      })
      this.socket.on('nextRound', ({ time, round, drawer }) => {
        this.store.commit('controller/setTimer', time)
        this.store.commit('controller/setRound', round)
        this.store.commit('controller/setDrawer', drawer)
        this.store.commit('controller/resetPlayerCorrectness')
        this.store.commit('controller/setGameState', 'PLAYING')
      })
      this.socket.on('gameEnd', () => {
        this.store.commit('controller/setGameState', 'GAMEEND')
      })
      this.socket.on('drawing', data => {
        bus.$emit('drawing', data)
      })
      this.socket.on('lockInPlayer', ({ player }) => {
        this.store.commit('controller/lockInPlayer', player)
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
        this.router.push({ name: 'waiting' })
      })
      this.socket.on('gameStarted', data => {
        if (data.drawer) {
          this.router.push({ name: 'drawing' })
          this.store.commit('player/setPromptOptions', data.prompts)
        } else {
          this.router.push({ name: 'guessing' })
        }

        this.store.commit('player/setGameState', 'PLAYING')
      })
      this.socket.on('newGuess', data => {
        this.store.commit('player/addGuess', data)
      })
      this.socket.on('correctGuess', () => {
        this.store.commit('player/setCorrect', true)
      })
      this.socket.on('timerUpdate', ({ time }) => {
        this.store.commit('player/setTimer', time)
      })
      this.socket.on('roundEnd', ({ time }) => {
        this.store.commit('player/resetAfterRoundEnd')
        this.store.commit('player/setTimer', time)
        this.store.commit('player/setGameState', 'ROUNDEND')
      })
      this.socket.on('nextRound', ({ time, round, drawer, prompts }) => {
        if (drawer) {
          this.router.push({ name: 'drawing' })
          this.store.commit('player/setPromptOptions', prompts)
        } else {
          this.router.push({ name: 'guessing' })
        }

        this.store.commit('player/setTimer', time)
        this.store.commit('player/setRound', round)
        this.store.commit('player/setGameState', 'PLAYING')
      })
      this.socket.on('gameEnd', () => {
        this.store.commit('player/setGameState', 'GAMEEND')
      })
    } else {
      console.log('already connected')
    }
  }

  lockIn = async () => {
    if (!this.socket) {
      console.error('socket not connected')
    } else {
      this.socket.emit('lockIn')
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

  choosePrompt = async data => {
    if (!this.socket) {
      console.error('socket not connected')
    } else {
      this.socket.emit('choosePrompt', data)
    }
  }

  /*
   * =========================
   * END: Player functions
   * =========================
   */
}

export default SocketWrapper
