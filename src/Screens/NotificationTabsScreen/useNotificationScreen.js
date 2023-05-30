import React, {memo, useCallback} from 'react';

import {ChatData} from '../../Utils/localDB';
import {Invitation} from '../../Utils/localDB';

const useNotificationScreen = () => {
  return {
    ChatData,
    Invitation,
  };
};
export default useNotificationScreen;
