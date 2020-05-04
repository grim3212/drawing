export default function() {
  return {
    room: '',
    players: [],
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
    lines: [],
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
