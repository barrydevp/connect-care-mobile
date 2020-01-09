export const reducers = [{
  change_status: (state, { payload: { status } }) => {
    return {
      ...state,
      status
    }
  },
  put_token: (state, { payload: { token, expiresAt } }) => {
    return {
      ...state,
      "x-auth-key": token,
      expiresAt
    }
  },
  logout: (state) => {
    return {
      
    }
  }
},(state) => {
  // console.log("this is beforeHandle")
  return state
}]

export const persistConfig = {
  key: "loginv1",
  // storage: "",
  // blacklist: "",
  // whitelist: ["x-auth-key"],
  // transforms: [createExpirationTransform({
  //   expireKey: 'expiresAt',
  //   defaultState: {
  //     status: false
  //   }
  // })],
  // stateReconciler: ""
}