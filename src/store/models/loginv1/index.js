import { reducers, persistConfig } from "./reducers";
import sagas from "./sagas";
// import type from './types'

export default {
  namespace: "loginv1",
  state: {
    status: true,
    "x-auth-key-v1": "123",
  },
  sagas,
  reducers,
  persistConfig
};
