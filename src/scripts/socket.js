import io from 'socket.io-client'
import { Notify } from 'quasar'
import bus from './bus'

class SocketWrapper {
  constructor({ store, router }) {
    this.socket = null
    this.store = store
    this.router = router
    this.connectionUrl = '127.0.0.1:5052'
  }

  connected = () => this.socket !== null

  /*
   * =========================
   * START: Controller functions
   * =========================
   */

  createLobby = async opts => {
    if (!this.socket) {
      this.socket = await io(this.connectionUrl, {
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
        this.store.commit('controller/setTimer', time)
        this.store.commit('controller/setGameState', 'ROUNDEND')
      })
      this.socket.on('nextRound', ({ time, round, drawer }) => {
        bus.$emit('clearCanvas')
        this.store.commit('controller/setTimer', time)
        this.store.commit('controller/setRound', round)
        this.store.commit('controller/setDrawer', drawer)
        this.store.commit('controller/clearGuesses')
        this.store.commit('controller/resetPlayerCorrectness')
        this.store.commit('controller/setGameState', 'PLAYING')
      })
      this.socket.on('gameEnd', ({ sortedPlayers }) => {
        // Update with rank, ties, and final points
        for (const player of sortedPlayers) {
          this.store.commit('controller/setPlayer', player)
        }

        this.store.commit('controller/setGameState', 'GAMEEND')
        this.router.push({ name: 'scoreboard' })
      })
      this.socket.on('drawing', data => {
        bus.$emit('drawing', data)
      })
      this.socket.on('clearCanvas', () => {
        bus.$emit('clearCanvas')
      })
      this.socket.on('lockInPlayer', data => {
        this.store.commit('controller/lockInPlayer', data)
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
      this.socket = await io(this.connectionUrl, {
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
      this.socket.on('correctGuess', data => {
        this.store.commit('player/addGuess', data)
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
      this.socket.on('gameEnd', ({ rank, points, tie }) => {
        this.store.commit('player/setPoints', points)
        this.store.commit('player/setRank', rank)
        this.store.commit('player/setTie', tie)
        this.store.commit('player/setGameState', 'GAMEEND')
        this.router.push({ name: 'score' })
      })
      this.socket.on('updatePoints', ({ points }) => {
        this.store.commit('player/setPoints', points)
      })
    } else {
      console.log('already connected')
    }
  }

  lockIn = async data => {
    if (!this.socket) {
      console.error('socket not connected')
    } else {
      this.socket.emit('lockIn', data)
    }
  }

  clearCanvas = async () => {
    if (!this.socket) {
      console.error('socket not connected')
    } else {
      this.socket.emit('clearCanvas')
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
