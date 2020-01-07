import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import prepareReducers from "./prepareReducers";
import prepareRootSaga from "./prepareRootSaga";

import models from "./models";

const reducers = prepareReducers(models);
const rootSagas = prepareRootSaga(models);

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSagas);

const persistor = persistStore(
  createStore(reducers, applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSagas);

export { store, persistor };
