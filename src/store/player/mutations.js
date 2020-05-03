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
