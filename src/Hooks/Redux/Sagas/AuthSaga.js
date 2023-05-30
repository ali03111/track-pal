import {call, put, takeLatest} from 'redux-saga/effects';
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
  logOutUser,
  loginUser,
  updateAuth,
  updateUser,
} from '../Action/AuthAction';
import {loadingFalse, loadingTrue} from '../Action/isloadingAction';
import {errorMessage} from '../../Config/NotificationMessage';
import {loginUrl} from '../../Utils/Urls';
import {
  getFbResult,
  logOutFirebase,
  loginService,
  logoutService,
  registerService,
} from '../../Services/AuthServices';

// function* loginSaga(action) {
//   yield put(loadingTrue());
//   const {payload} = action;
//   const {datas} = payload;
//   const getLoginData = async () => {
//     try {
//       const data = await loginObject[payload.type];
//       const result = await data(datas);
//       return {data: result, ok: true};
//     } catch (error) {
//       return {data: error, ok: false};
//     }
//   };
//   try {
//     const {ok, data} = yield call(getLoginData);
//     console.log('ok', ok, data);
//     if (ok) {
//       const idTokenResult = yield call(getFbResult);
//       console.log('idTokenResult', idTokenResult);
//       const {data, ok} = yield call(loginService, {token: idTokenResult.token});
//       console.log('data', data);
//       if (ok) {
//         console.log('shdfjhsvfhjks', data);
//         yield put(updateAuth(data));
//       } else errorMessage('Some xnvkl kl ');
//     }
//   } catch (error) {
//     console.log('errrr', error);
//     errorMessage(error);
//   } finally {
//     yield put(loadingFalse());
//   }
// }

const loginObject = {
  Google: () => googleLogin(),
  facebook: () => faceBookLogin(),
  email: datas => emailLogin(datas),
  appleID: () => appleIdlogin(),
};

const loginSaga = function* ({payload: {datas, type}}) {
  yield put(loadingTrue());

  try {
    const getLoginData = loginObject[type];
    const result = yield call(getLoginData, datas);
    const {socialData, ok} = {socialData: result, ok: true};

    console.log('socialData', ok, socialData);

    if (ok) {
      console.log('chvekc if', socialData);
      const idTokenResult = yield call(getFbResult);
      console.log('idTokenResult', idTokenResult);
      const jwtToken = idTokenResult.token;
      if (jwtToken) {
        const {data, ok} = yield call(loginService, {
          token: jwtToken,
          data: socialData,
        });
        console.log('data', data);

        if (ok) {
          console.log('shdfjhsvfhjks', data);
          yield put(updateAuth(data));
        } else {
          errorMessage('Some xnvkl kl ');
        }
      }
    }
  } catch (error) {
    console.error('errrr', error);
    errorMessage(error.message.split(' ').slice(1).join(' '));
  } finally {
    yield put(loadingFalse());
  }
};

function* registerSaga({payload: {datas}}) {
  yield put(loadingTrue());
  try {
    const result = yield call(emailSignUp, datas);
    const {data, ok} = {data: result, ok: true};
    if (ok) {
      const idTokenResult = yield call(getFbResult);
      const jwtToken = idTokenResult.token;
      console.log('dsgfsdgsd', jwtToken);
      if (jwtToken) {
        console.log('datas', datas);
        const {data, ok} = yield call(registerService, {
          token: jwtToken,
          data: datas,
        });
        console.log('data', data);

        if (ok) {
          console.log('shdfjhsvfhjks', data);
          yield call(emailLogin, datas);
          yield put(updateAuth(data));
        } else {
          errorMessage('Some xnvkl kl ');
        }
      }
    }
  } catch (error) {
    console.error('errrr', error);
    errorMessage(error.message.split(' ').slice(1).join(' '));
  } finally {
    yield put(loadingFalse());
  }
}

function* logOutSaga(action) {
  try {
    // yield put(loadingTrue());
    const {ok, data, originalError} = yield call(logoutService);
    console.log('logout data', ok, originalError, originalError);
    if (ok) {
      yield call(logOutFirebase);
      yield call(logOutUser);
    } // yield put(loadingFalse());
  } catch (error) {
    errorMessage(error.message.split(' ').slice(1).join(' '));
  } finally {
    yield put(loadingFalse());
  }
}

function* authSaga() {
  yield takeLatest(types.LoginType, loginSaga);
  yield takeLatest(types.LogoutType, logOutSaga);
  yield takeLatest(types.RegisterUser, registerSaga);
}

export default authSaga;
