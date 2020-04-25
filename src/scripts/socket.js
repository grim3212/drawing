import io from 'socket.io-client'

class SocketWrapper {
  constructor() {
    this.socket = null
  }

  playerJoin = async opts => {
    if (!this.socket) {
      this.socket = await io('localhost:5052', {
        query: {
          handshake: JSON.stringify({ ...opts })
        }
      })

      this.socket.on('kicked', ({ reason }) => {
        console.log(`player was kicked for ${reason}`)
        this.socket = null
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
    } else {
      console.log('already connected to socket')
    }
  }
}

export default SocketWrapper
