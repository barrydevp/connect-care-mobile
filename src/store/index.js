import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import prepareReducers from "./prepareReducers";
import prepareRootSaga from "./prepareRootSaga";
import prepareInitialState from "./prepareInitialState";

import models from "./models";

const reducers = prepareReducers(models);
const rootSagas = prepareRootSaga(models);
const initialState = prepareInitialState(models);

// console.log("models:", models);
// console.log("reducers:", reducers);
// console.log("rootSagas:", rootSagas);
// console.log("initialState:", initialState);

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  initialState,
  applyMiddleware(sagaMiddleware)
);

const persistor = persistStore(store);
sagaMiddleware.run(rootSagas);

export { store, persistor };
