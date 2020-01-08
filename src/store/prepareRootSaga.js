import { all } from "redux-saga/effects";
import { Log } from "~/utils";

export default function(models = []) {
  return function*() {
    const allSagas = Object.values(models).reduce((previous, model) => {
      const sagas = model.sagas;

      if (!sagas) {
        Log.warn(`sagas is undefined`);

        return previous;
      }

      const activeSagas = Object.values(sagas).map(saga => saga());

      return previous.concat(activeSagas);
    }, []);

    yield all(allSagas);
  };
}
