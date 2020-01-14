export const reducers = [
  {
    change_placesId: (state, { payload: { placesId } }) => {
      return {
        ...state,
        placesId
      };
    },
    change_currentUser: (state, { payload: { currentUser } }) => {
      return {
        ...state,
        currentUser
      };
    },
    change_all: (state, { payload }) => {
      return {
        ...state,
        ...payload
      };
    },
    eraseAll: () => {
      return {};
    },
    change_status: (state, { payload: { status } }) => {
      return {
        ...state,
        status
      };
    },
    put_token: (state, { payload: { token, expiresAt, status } }) => {
      return {
        ...state,
        "x-auth-key": token,
        expiresAt,
        status
      };
    }
  }
  /* state => {
    // console.log("this is beforeHandle")
    return state;
  } */
];

// export const persistConfig = {
//   key: "auth",
//   // storage: "",
//   // blacklist: "",
//   // whitelist: ["x-auth-key"],
//   // transforms: [createExpirationTransform({
//   //   expireKey: 'expiresAt',
//   //   defaultState: {
//   //     status: false
//   //   }
//   // })],
//   // stateReconciler: ""
// }
