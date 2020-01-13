// import { createExpirationTransform } from "~/utils";

export const reducers = {
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
  },
  logout: () => {
    
    return {};
  }
};

// export const persistConfig = {
//   key: "",
//   storage: "",
//   blacklist: "",
//   whitelist: ["x-auth-key"],
//   transforms: [
//     createExpirationTransform.keyIsProperty(
//       {
//         expireKey: "expiresAt",
//         defaultState: () => ({
//           status: true
//         })
//       } /* {
//       whitelist: []
//     } */
//     )
//   ],
//   stateReconciler: ""
// };
