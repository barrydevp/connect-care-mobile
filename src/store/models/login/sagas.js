import { put, call, takeEvery, delay } from "redux-saga/effects";
import moment from "moment";
import ApiServer from "~/api";

function* authenticate({ payload: { username, password, callback } }) {
  const data = yield call(ApiServer.authenticate.login, {
    userName: username,
    password: password
  });

  // yield put({ type: "login/test" });

  if (data.success) {
    yield put({
      type: "login/put_token",
      payload: {
        token: data.token,
        status: data.status === "ok",
        expiresAt: moment().subtract(1, "days")
      }
    });
    callback();
  } else {
    console.log(data);
  }
}

export default {
  watchAuthenticate: [
    function*() {
      yield takeEvery("login/authenticate", authenticate);
    },
    {
      type: "watcher"
    }
  ],
  watchTest: [
    function*() {
      yield takeEvery("login/test", function*() {
        yield delay(5000);
      });
    },
    {
      type: "watcher"
    }
  ]
};
