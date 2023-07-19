import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const KeyBoardWrapper = ({children, scroll}) => (
  <KeyboardAwareScrollView
    showsVerticalScrollIndicator={false}
    bounces={true}
    scrollEnabled={scroll ?? true}
    contentContainerStyle={{flexGrow: 1}}>
    {children}
  </KeyboardAwareScrollView>
);

export default KeyBoardWrapper;
