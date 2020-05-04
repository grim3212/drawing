export default function() {
  return {
    self: {
      id: '-1',
      username: 'Player',
      roomCode: '',
      icon: {
        name: 'font_download',
        color: 'orange'
      }
    },
    guesses: [
      {
        player: {
          username: 'test',
          icon: {
            name: 'font_download',
            color: 'orange'
          }
        },
        text: 'hey what up',
        time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).getTime()
      }
    ],
    promptOptions: [],
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
