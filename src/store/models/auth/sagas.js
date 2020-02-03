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
    const currentUser = yield call(
      ApiServer.users.currentUser,
      auth["x-auth-key"]
    );
    console.log("here", currentUser)
    yield put({
      type: "auth/change_currentUser",
      payload: { currentUser }
    });
    Alert.alert("Cập nhật thành công!");
  } catch (error) {
    console.log(error);
    Alert.alert(error && error.error && error.error.message || "Có lỗi xảy ra!")
  }
}

function* changePassword({ payload: { body, callback } }) {
  try {
    const state = yield select();
    const { auth } = state || {};
    const headers = {
      "x-auth-key": auth["x-auth-key"]
    };

    const response = yield call(
      ApiServer.users.changePass,
      auth.currentUser.id,
      headers,
      body
    );
    if (response && response.success) {
      Alert.alert("Cập nhật mật khẩu mới thành công!");
      callback && callback();
    } else {
      Alert.alert(`${response.error.message}`);
    }
  } catch (error) {
    console.log(error);
    Alert.alert(`Lỗi hệ thống!`);
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
        // console.log("test");
        const action = yield take("auth/updateProfile");
        yield call(updateProfile, action);
      }
    },
    {
      type: "watcher"
    }
  ],
  watchChangePassword: [
    function*() {
      while (true) {
        // console.log("test");
        const action = yield take("auth/changePassword");
        yield call(changePassword, action);
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
