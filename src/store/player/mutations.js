export function setupPlayer(state, { username, roomCode }) {
  state.self.username = username
  state.self.roomCode = roomCode
}

export function setId(state, id) {
  state.self.id = id
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

export function setPromptOptions(state, options) {
  state.promptOptions = options
}

export function setCorrect(state, correct) {
  state.correct = correct
}

export function resetAfterRoundEnd(state) {
  state.correct = false
  state.promptOptions = []
  state.prompt = ''
  state.guesses = []
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

export function lockIn(state, { icon, color }) {
  state.self.locked = true
  state.self.icon = icon
  state.self.favoriteColor = color
}

export function setPoints(state, newPoints) {
  state.points = newPoints
}

export function setRank(state, newRank) {
  state.rank = newRank
}

export function setTie(state, newTie) {
  state.tie = newTie
}
