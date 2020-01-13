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
      type: "auth/put_token",
      payload: {
        token: data.token,
        status: data.status === "ok",
        expiresAt: moment().add(2, "days")
      }
    });
    callback(data.token);
  } else {
    console.log(data);
  }
}

export default {
  fetchCurrentUserWithToken: function*({ payload: { token } }) {
    try {
      const currentUser = yield call(ApiServer.users.currentUser, token);

      yield put({
        type: "auth/change_currentUser",
        payload: { currentUser }
      });
    } catch (error) {
      console.log(error);
    }
  },
  watchAuthenticate: [
    function*() {
      yield takeEvery("auth/authenticate", authenticate);
    },
    {
      type: "watcher"
    }
  ]
};
