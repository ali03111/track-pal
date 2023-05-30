import {all} from 'redux-saga/effects';
import Auth_Saga from './AuthSaga';

function* rootSaga() {
  yield all([Auth_Saga()]);
}

export default rootSaga;
