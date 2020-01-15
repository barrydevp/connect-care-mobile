import { Alert } from "react-native";
import { put, call, takeEvery, delay, select, take } from "redux-saga/effects";
import moment from "moment";
import ApiServer from "~/api";
import {
  navigateAuthActions,
  navigateChoosePlaceActions,
  navigateDashboardActions
} from "~/navigations/navigationActions";
import { is } from "~/utils";

function* authenticate({ payload: { username, password, callback } }) {
  try {
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
      Alert.alert((data.error && data.error.message) || "Đăng nhập thất bại!");
    }
  } catch (e) {
    console.log(e);
  }
}

function* updateProfile({ payload: { body } }) {
  try {
    const state = yield select();
    const { auth } = state || {};
    const headers = {
      "x-auth-key": auth["x-auth-key"]
    };

    // console.log(body);

    yield call(ApiServer.users.putUser, auth.currentUser.id, headers, body);
    yield put({
      type: "auth/fetchCurrentUserWithToken",
      payload: {
        token: auth["x-auth-key"],
        onSucces: () => {
          Alert.alert("Cập nhật thành công!");
        },
        onError: () => {
          Alert.alert("Lấy thông tin sau cập nhật thất bại!");
        }
      }
    });
  } catch (error) {
    console.log(error);
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
  watchUpdateProfile: [
    function*() {
      while (true) {
        console.log("test");
        const action = yield take("auth/updateProfile");
        yield call(updateProfile, action);
      }
    },
    {
      type: "watcher"
    }
  ],
  watchAuthenticate: [
    function*() {
      yield takeEvery("auth/authenticate", authenticate);
    },
    {
      type: "watcher"
    }
  ]
};
