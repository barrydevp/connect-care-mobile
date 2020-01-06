import { all } from "redux-saga/effects";

export default function*(models = []) {
  const allSagas = Object.values(models).reduce((previous, model) => {
    const sagas = model.sagas;

    if (!sagas) return previous;

    const activeSagas = Object.values(sagas).map(saga => saga());

    return previous.concat(activeSagas);
  }, []);

  yield all(allSagas);
}
