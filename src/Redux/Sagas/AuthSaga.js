import {call, delay, put, takeLatest} from 'redux-saga/effects';
import {types} from '../types';
import {
  appleIdlogin,
  emailLogin,
  emailSignUp,
  faceBookLogin,
  googleLogin,
} from '../../Utils/SocialLogin';
import {updateAuth} from '../Action/AuthAction';
import {loadingFalse, loadingTrue} from '../Action/isloadingAction';
import {
  fcmRegService,
  getFbResult,
  logOutFirebase,
  loginService,
  registerService,
  updateProfileServices,
} from '../../Services/AuthServices';
import DeviceInfo from 'react-native-device-info';
import {errorMessage} from '../../Config/NotificationMessage';

const loginObject = {
  Google: () => googleLogin(),
  facebook: () => faceBookLogin(),
  email: datas => emailSignUp(datas),
  appleID: () => appleIdlogin(),
};

/* `const loginSaga` is a generator function that is used as a saga in a Redux-Saga middleware. It
takes an action object as an argument, destructures its `payload` property to get `datas` and `type`
properties, and then performs a series of asynchronous operations using the `yield` keyword. */
const loginSaga = function* ({payload: {datas, type}}) {
  yield put(loadingTrue());
  const {getUniqueId} = DeviceInfo;
  const deviceToken = yield call(getUniqueId);
  try {
    const getLoginData = loginObject[type];
    const resultData = yield call(getLoginData, datas);
    const {socialData, ok} = {socialData: resultData, ok: true};
    if (ok) {
      const idTokenResult = yield call(getFbResult);
      const jwtToken = idTokenResult.token;
      if (jwtToken) {
        console.log('jwtToken', jwtToken);
        // if (socialData.isNewUser || type == 'email') {
        //   var {result} = yield call(createTelematicUser, {
        //     token: deviceToken,
        //     data: datas.name ? datas : socialData,
        //   });
        // }
        const {data, ok} = yield call(registerService, {
          token: jwtToken,
          name: datas?.name,
          email: datas?.email,
          password: datas?.password,
          phone: datas?.number,
        });
        console.log('data=========>>>>>>>', data);
        yield put(loadingTrue());
        if (ok) {
          yield put(loadingTrue());
          yield put(updateAuth(data));
        }
      }
    }
  } catch (error) {
    errorMessage(error.message.split(' ').slice(1).join(' ') ?? error);
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
    const result = yield call(emailLogin, datas);
    const {data, ok} = {data: result, ok: true};
    if (ok) {
      const idTokenResult = yield call(getFbResult);
      const jwtToken = idTokenResult.token;
      if (jwtToken) {
        const {data, ok} = yield call(loginService, {
          token: jwtToken,
        });
        yield put(loadingTrue());
        console.log('sdjbfjksdbfjbsdjfbsdf', data);
        if (ok) {
          yield put(loadingTrue());
          yield put(updateAuth(data));
        }
      }
    }
  } catch (error) {
    errorMessage(error.message.split(' ').slice(1).join(' ') ?? error);
    console.log('slbklsdbbsdfkgbsdklbgs', error);
  } finally {
    // delay(4000);
    yield put(loadingFalse());
  }
}

/* `logOutSaga` is a generator function that is used as a saga in a Redux-Saga middleware. It takes an
action object as an argument, but it is not used in the function. The function performs a series of
asynchronous operations using the `yield` keyword. */
function* logOutSaga(action) {
  try {
    // yield call(logoutService);
    yield put({type: types.LogoutType});
    yield call(logOutFirebase);
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
      // successMessage('Your profile has been updated');
    }
  } catch (error) {
    console.log('error ', error);
    errorMessage(error.message.split(' ').slice(1).join(' '));
  } finally {
    delay(2000);
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
