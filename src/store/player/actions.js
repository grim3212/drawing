export function addGuess({ commit, state }, guess) {
  return new Promise(resolve => {
    const newGuess = {
      player: state.self,
      text: guess.text,
      time: guess.time
    }

    commit('addGuess', newGuess)
    resolve(newGuess)
  })
}
