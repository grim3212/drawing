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
    ]
  }
}
