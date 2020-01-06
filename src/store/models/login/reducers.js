export const reducers = {
  change_status: (state, { payload: { status } }) => {
    return {
      ...state,
      status: status
    }
  }
}