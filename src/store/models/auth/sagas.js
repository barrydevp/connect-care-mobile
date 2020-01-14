import { put, call, takeEvery, delay } from "redux-saga/effects";
import moment from "moment";
import ApiServer from "~/api";
import {
  navigateAuthActions,
  navigateChoosePlaceActions,
  navigateDashboardActions
} from "~/navigations/navigationActions";
import { is } from "~/utils";

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
  fetchCurrentUserWithToken: function*({
    payload: { token, onSucces, onError }
  }) {
    try {
      const currentUser = yield call(ApiServer.users.currentUser, token);
      yield put({
        type: "auth/change_currentUser",
        payload: { currentUser }
      });

      is.func(onSucces) && onSucces();
    } catch (error) {
      console.log(error);
      is.func(onError) && onError(error);
    }
  },
  logout: function*({ payload: { navigation } }) {
    yield put({ type: "auth/eraseAll" });
    navigation.dispatch(navigateAuthActions());
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
