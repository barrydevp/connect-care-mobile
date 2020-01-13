import { reducers, persistConfig } from "./reducers";
import sagas from "./sagas";
// import type from './types'

export default {
  namespace: "auth",
  state: {},
  sagas,
  reducers,
  persistConfig
};
