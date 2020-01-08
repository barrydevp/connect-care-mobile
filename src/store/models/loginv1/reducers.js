export const reducers = {
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
}

export const persistConfig = {
  // key: "",
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