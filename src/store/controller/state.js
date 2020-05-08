export default function() {
  return {
    room: '',
    players: [],
    guesses: [],
    prompt: '',
    drawer: '',
    round: 1,
    timer: 60,

    /**
     * The state that the app is currently in
     * STARTUP,
     * PLAYING,
     * ROUNDEND,
     * GAMEEND
     */
    gameState: 'STARTUP'
  }
}
