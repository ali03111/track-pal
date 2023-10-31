import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AuthReducer from './AuthReducer';
import loadingReducer from './loadingReducer';
import ShareLocationReducer from './ShareLocationReducer';
import onboardingReducer from './onboardingReducer';
import createSagaMiddleware from 'redux-saga';
import mySaga from './../Sagas/index';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import AlertReucer from './AlertReucer';
import invitationNotReducer from './invitationNotReducer';
import GeneralNotReducer from './GeneralNotReducer';
import ChatNotifyReducer from './ChatNotifyReducer';

const sagaMiddleware = createSagaMiddleware();

const onBoardPersistConfig = {
  key: 'onboarding',
  storage: AsyncStorage,
  whitelist: 'onboarding',
};

const inviteNotificationPersistConfig = {
  key: 'inviNotify',
  storage: AsyncStorage,
  whitelist: 'inviNotify',
};

const generalNotifyPersistConfig = {
  key: 'generalNotify',
  storage: AsyncStorage,
  whitelist: 'generalNotify',
};

const chatNotifyPersistConfig = {
  key: 'chatNotify',
  storage: AsyncStorage,
  whitelist: 'chatNotify',
};

const AuthPersistConfig = {
  key: 'Auth',
  storage: AsyncStorage,
  whitelist: ['userData', 'token', 'isLogin'],
};

const LocationPersistConfig = {
  key: 'islocationShare',
  storage: AsyncStorage,
  whitelist: ['islocationShare', 'tripId', 'tripOwnerID'],
};

const reducers = {
  onboarding: persistReducer(onBoardPersistConfig, onboardingReducer),
  Auth: persistReducer(AuthPersistConfig, AuthReducer),
  islocationShare: persistReducer(LocationPersistConfig, ShareLocationReducer),
  inviNotify: persistReducer(
    inviteNotificationPersistConfig,
    invitationNotReducer,
  ),
  generalNotify: persistReducer(generalNotifyPersistConfig, GeneralNotReducer),
  chatNotify: persistReducer(chatNotifyPersistConfig, ChatNotifyReducer),
  isloading: loadingReducer,
  isAlert: AlertReucer,
  // isQuestion: questionReducer,
  // sagas: applyMiddleware(sagaMiddleware),
};

export const store = createStore(
  combineReducers(reducers),
  applyMiddleware(sagaMiddleware),
);

export const persistor = persistStore(store);
// then run the saga
sagaMiddleware.run(mySaga);
