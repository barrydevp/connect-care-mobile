import { all } from "redux-saga/effects";

import { watchAndLog } from '../sagas/log'

// notice how we now only export the rootSaga
// single entry point to start all Sagas at onceß
export default function* rootSaga() {
  const allSaga = yield all([watchAndLog()]);

  console.log("done rootSaga");
}