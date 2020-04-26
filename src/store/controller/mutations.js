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
