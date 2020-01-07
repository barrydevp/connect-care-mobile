export const reducers = {
  change_status: (state, { payload: { status } }) => {
    return {
      ...state,
      status: status
    }
  }
}

export const persistConfig = {
  // key: "",
  // storage: "",
  // blacklist: "",
  // whitelist: "",
  // transforms: "",
  // stateReconciler: ""
}