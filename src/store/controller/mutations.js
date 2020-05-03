export function setRoom(state, room) {
  state.room = room
}

export function addPlayer(state, player) {
  state.players.push(player)
}

export function removePlayer(state, id) {
  const idx = state.players.findIndex(el => el.id === id)
  if (idx > -1) {
    state.players.splice(idx, 1)
  }
}

export function addGuess(state, { player, text, time }) {
  state.guesses.push({
    player,
    text,
    time
  })
}

export function clearGuesses(state) {
  state.guesses = []
}

export function addLine(state, line) {
  state.lines.push(line)
}
