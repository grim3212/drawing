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

export function setPlayer(state, newPlayer) {
  const foundIndex = state.players.findIndex(x => x.id === newPlayer.id)
  if (foundIndex > -1) state.players[foundIndex] = newPlayer
}

export function resetPlayerCorrectness(state) {
  state.players.forEach((part, index, theArray) => {
    theArray[index].correct = false
  })
}

export function addGuess(state, guess) {
  state.guesses.push(guess)
}

export function clearGuesses(state) {
  state.guesses = []
}

export function setPrompt(state, newPrompt) {
  state.prompt = newPrompt
}

export function setDrawer(state, newDrawer) {
  state.drawer = newDrawer
}

export function setTimer(state, newTime) {
  state.timer = newTime
}

export function setRound(state, newRound) {
  state.round = newRound
}

export function setGameState(state, newGameState) {
  state.gameState = newGameState
}

export function lockInPlayer(state, { player, icon, color }) {
  const foundIndex = state.players.findIndex(x => x.id === player)
  if (foundIndex > -1) {
    state.players[foundIndex].locked = true
    state.players[foundIndex].icon = icon
    state.players[foundIndex].favoriteColor = color
  }
}
