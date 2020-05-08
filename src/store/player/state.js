export default function() {
  return {
    self: {
      id: '-1',
      username: 'Player',
      roomCode: '',
      icon: 'font_download',
      favoriteColor: '#000000',
      locked: false
    },
    guesses: [],
    promptOptions: [''],
    prompt: '',
    round: 1,
    timer: 60,
    points: 0,
    rank: 0,
    tie: false,
    correct: false,

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
