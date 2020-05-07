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
    guesses: [
      {
        player: {
          id: '-1',
          username: 'test',
          icon: 'font_download',
          favoriteColor: 'orange'
        },
        text: 'hey what up',
        time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).getTime(),
        correct: true
      }
    ],
    promptOptions: [''],
    prompt: '',
    round: 1,
    timer: 60,
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
