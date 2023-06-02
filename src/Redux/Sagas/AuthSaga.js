import {call, delay, put, takeLatest} from 'redux-saga/effects';
import {types} from '../types';
import {
  appleIdlogin,
  emailLogin,
  emailSignUp,
  faceBookLogin,
  googleLogin,
} from '../../Utils/SocialLogin';
import API from '../../Utils/helperFunc';
import {
  logOutAuth,
  logOutUser,
  loginUser,
  updateAuth,
  updateUser,
} from '../Action/AuthAction';
import {loadingFalse, loadingTrue} from '../Action/isloadingAction';
import {errorMessage, successMessage} from '../../Config/NotificationMessage';
import {loginUrl} from '../../Utils/Urls';
import {
  fcmRegService,
  getFbResult,
  logOutFirebase,
  loginService,
  logoutService,
  registerService,
  updateProfileServices,
} from '../../Services/AuthServices';

const loginObject = {
  Google: () => googleLogin(),
  facebook: () => faceBookLogin(),
  email: datas => emailLogin(datas),
  appleID: () => appleIdlogin(),
};

/* `const loginSaga` is a generator function that is used as a saga in a Redux-Saga middleware. It
takes an action object as an argument, destructures its `payload` property to get `datas` and `type`
properties, and then performs a series of asynchronous operations using the `yield` keyword. */
const loginSaga = function* ({payload: {datas, type}}) {
  yield put(loadingTrue());

  try {
    const getLoginData = loginObject[type];
    const result = yield call(getLoginData, datas);
    const {socialData, ok} = {socialData: result, ok: true};
    if (ok) {
      const idTokenResult = yield call(getFbResult);
      const jwtToken = idTokenResult.token;
      if (jwtToken) {
        const {data, ok} = yield call(loginService, {
          token: jwtToken,
          data: socialData,
        });
        if (ok) {
          yield put(updateAuth(data));
        }
      }
    }
  } catch (error) {
    errorMessage(error.message.split(' ').slice(1).join(' '));
    console.log('err', error);
  } finally {
    yield put(loadingFalse());
  }
};

/* `registerSaga` is a generator function that is used as a saga in a Redux-Saga middleware. It takes
an action object as an argument, destructures its `payload` property to get `datas`, and then
performs a series of asynchronous operations using the `yield` keyword. */
function* registerSaga({payload: {datas}}) {
  yield put(loadingTrue());
  try {
    const result = yield call(emailSignUp, datas);
    const {data, ok} = {data: result, ok: true};
    if (ok) {
      const idTokenResult = yield call(getFbResult);
      const jwtToken = idTokenResult.token;
      if (jwtToken) {
        const {data, ok} = yield call(registerService, {
          token: jwtToken,
          data: datas,
        });
        if (ok) {
          yield call(emailLogin, datas);
          yield put(updateAuth(data));
        }
      }
    }
  } catch (error) {
    errorMessage(error.message.split(' ').slice(1).join(' '));
  } finally {
    yield put(loadingFalse());
  }
}

/* `logOutSaga` is a generator function that is used as a saga in a Redux-Saga middleware. It takes an
action object as an argument, but it is not used in the function. The function performs a series of
asynchronous operations using the `yield` keyword. */
function* logOutSaga(action) {
  try {
    yield put({type: types.CleanRecentLocation});
    yield call(logoutService);
    yield call(logOutFirebase);
    yield put({type: types.LogoutType});
    console.log('okokok');
  } catch (error) {
    errorMessage(error.message.split(' ').slice(1).join(' '));
  } finally {
    yield put(loadingFalse());
  }
}
/* The `updateProfileSaga` function is a generator function that is used as a saga in a Redux-Saga
middleware. It takes an action object as an argument, destructures its `payload` property to get
`profileData`, and then performs a series of asynchronous operations using the `yield` keyword. */

function* updateProfileSaga({payload: profileData}) {
  yield put(loadingTrue());
  try {
    // console.log('dbnjdf', profileData);
    const {ok, data, originalError} = yield call(
      updateProfileServices,
      profileData,
    );
    console.log('user', originalError, data);
    if (ok) {
      yield put({type: types.UpdateProfile, payload: data.data});
      successMessage('Your profile has been updated');
    }
  } catch (error) {
    console.log('error ', error);
    errorMessage(error.message.split(' ').slice(1).join(' '));
  } finally {
    yield put(loadingFalse());
  }
}

/* This function is used to add the fcm token to the database. */
function* fcmTokenSaga(action) {
  yield call(fcmRegService, action.payload);
}

function* authSaga() {
  yield takeLatest(types.LoginType, loginSaga);
  yield takeLatest(types.LogoutFirebaseType, logOutSaga);
  yield takeLatest(types.RegisterUser, registerSaga);
  yield takeLatest(types.UpdateUser, updateProfileSaga);
  yield takeLatest(types.fcmRegType, fcmTokenSaga);
}

export default authSaga;
