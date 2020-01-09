import { reducers, persistConfig } from "./reducers";
import sagas from "./sagas";
// import type from './types'

export default {
  namespace: "login",
  state: {
    status: false,
    // "x-auth-key": "123",
  },
  sagas,
  reducers,
  persistConfig
};