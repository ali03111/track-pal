/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {persistor, store} from './src/Redux/Reducer';
import {PersistGate} from 'redux-persist/integration/react';
import FlashMessage from 'react-native-flash-message';

const TrackPal = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <FlashMessage position="top" />
      <App />
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent(appName, () => TrackPal);
