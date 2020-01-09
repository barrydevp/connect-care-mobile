import { _ENV, request } from "~/utils";
import { put, call, takeEvery, delay } from "redux-saga/effects";
import moment from "moment";

function* authenticate({ payload: { username, password, callback } }) {
  const data = yield call(request, `${_ENV.API_ENDPOINT}/authenticate`, {
    method: "POST",
    body: {
      userName: username,
      password: password
    }
  });

  // yield put({ type: "login/test" });

  if (data.success) {
    yield put({
      type: "login/put_token",
      payload: {
        token: data.token,
        status: data.status === "ok",
        exprites: moment().add(1, "days")
      }
    });
    callback();
  }
}

export default {
  *watchAuthenticate() {
    yield takeEvery("login/authenticate", authenticate);
  },
  *watchTest() {
    yield takeEvery("login/test", function*() {
      yield delay(5000);
    });
  }
};
