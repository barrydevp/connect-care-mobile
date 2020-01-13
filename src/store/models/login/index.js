import { reducers, persistConfig } from "./reducers";
import sagas from "./sagas";
// import type from './types'

export default {
  namespace: "login",
  state: {
    status: false,
    "token": "test"
  },
  sagas,
  reducers,
  persistConfig
};
