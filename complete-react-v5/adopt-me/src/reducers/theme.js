export default function theme(state = 'blue', action) {
    if (action.type === "CHANGE_THEME") {
      return action.payload;
    }
    return state
}