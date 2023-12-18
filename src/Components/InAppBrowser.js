import {InAppBrowser as Browser} from 'react-native-inappbrowser-reborn';
import {Colors} from '../Theme/Variables';
const {Linking} = require('react-native');

export default class InAppBrowser {
  static open = async (url, onClose) => {
    try {
      if (await Browser.isAvailable()) {
        const result = await Browser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'done',
          preferredBarTintColor: Colors.primaryColor,
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: false,
          toolbarColor: Colors.primaryColor,
          secondaryToolbarColor: 'black',
          navigationBarColor: 'black',
          navigationBarDividerColor: 'white',
          enableUrlBarHiding: false,
          enableDefaultShare: false,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
        });

        // if (onClose) {
        // Browser.close(() => onClose());/
        // }
        console.log(result, 'result');
      } else Linking.openURL(url);
    } catch (error) {
      console.log('error', error);
    }
  };
}
