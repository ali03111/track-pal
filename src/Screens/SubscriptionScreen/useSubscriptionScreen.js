import React, {useEffect, useState} from 'react';
import {Alert, Platform} from 'react-native';
import IAP, {
  initConnection,
  purchaseErrorListener,
  purchaseUpdatedListener,
  flushFailedPurchasesCachedAsPendingAndroid,
  getProducts,
  getSubscriptions,
  useIAP,
  requestSubscription,
  getAvailablePurchases,
  transactionListener,
  clearTransactionIOS,
  TransactionReason,
  finishTransaction,
  acknowledgePurchaseAndroid,
} from 'react-native-iap';
import useReduxStore from '../../Hooks/UseReduxStore';
import API from '../../Utils/helperFunc';
import {
  AfterSubProAndroidUrl,
  AfterSubProUrl,
  StartTrialUrl,
} from '../../Utils/Urls';
import {errorMessage, successMessage} from '../../Config/NotificationMessage';
import {loadingFalse, loadingTrue} from '../../Redux/Action/isloadingAction';
import {types} from '../../Redux/types';

// const SKU = ['21436209'];
// const SKU = ['monthly_18012024'];
const SKU = Platform.select({
  android: ['monthly_18012024', 'yearly_18012024'],
  ios: ['monthly_18012024', 'yearly_18012024'],
});

function useSubscriptionScreen({navigate, goBack}) {
  let purchaseUpdateSubscription = null;
  let purchaseErrorSubscription = null;

  const [products, setProducts] = useState([]);

  const {
    connected,
    availablePurchases,
    currentPurchase,
    getAvailablePurchases,
  } = useIAP();

  const {getState, dispatch} = useReduxStore();

  const {userData} = getState('Auth');

  const startTrial = async () => {
    // Get the current date and time
    const currentDate = new Date();

    // Format the date and time
    const formattedDate = currentDate.toISOString().replace('Z', '.000000Z');

    const {ok, data} = await API.post(StartTrialUrl, {
      trial_start_at: formattedDate,
    });
    if (ok) {
      dispatch({type: types.UpdateProfile, payload: data?.data});
    } else errorMessage(data?.message);
  };

  // console.log('userDatauserDatauserDatauserDatauserDatauserData', userData);
  const buySubscription = async (proId, offerToken) => {
    dispatch(loadingTrue());
    if (connected) {
      const purchaseData = await requestSubscription(
        {
          sku: proId,

          subscriptionOffers: [
            {
              sku: proId,
              offerToken,
            },
          ],
        },
        true,
      );

      console.log(
        'purchaseDatapurchaseDatapurchaseDatapurchaseDatapurchaseDatapurchaseDatapurchaseDatapurchaseData',
        purchaseData,
      );

      const {ok, data} = await API.post(
        Platform.OS == 'ios' ? AfterSubProUrl : AfterSubProAndroidUrl,
        {
          productId:
            Platform.OS == 'ios'
              ? purchaseData?.productId
              : purchaseData[0]?.productId,
          transactionId:
            Platform.OS == 'ios'
              ? purchaseData?.originalTransactionIdentifierIOS
              : purchaseData[0]?.transactionId,
          payload:
            Platform.OS == 'ios'
              ? purchaseData
              : JSON.parse(purchaseData[0]?.dataAndroid),
        },
      );
      console.log('datadatadatadatadatadatadatadatadata', data);
      if (ok) {
        dispatch(loadingFalse());
        dispatch({type: types.UpdateProfile, payload: data});
        successMessage('User Subscribe');
        goBack();
        if (Platform.OS == 'android') {
          await acknowledgePurchaseAndroid({
            token: offerToken,
          });
          await finishTransaction({
            purchase: purchaseData,
            isConsumable: true,
          });
          await flushFailedPurchasesCachedAsPendingAndroid();
        }
        if (Platform.OS == 'ios') clearTransactionIOS();
      }
      dispatch(loadingFalse());
      purchaseUpdatedListener(purchase => {
        // console.log('purchaseUpdatedListenesdsdsdr', purchase);
        // ... rest of your code
        finishTransaction({purchase, isConsumable: true});
      });
    } else dispatch(loadingFalse());
  };

  const fetchData = async () => {
    dispatch(loadingTrue());
    const be = availablePurchases;

    const purchases = await getAvailablePurchases({
      onlyIncludeActiveItems: true,
      alsoPublishToEventListener: true,
      automaticallyFinishRestoredTransactions: false,
    });
    // const isSubscribed = purchases.some(
    //   purchase => purchase.productId === 'monthly_18012024',
    // );
    // if (isSubscribed) {
    //   Alert('active');
    // } else {
    //   Alert('not subscribed');
    // }
    // console.log('getgetgetgetgetgetgetget', get);
    try {
      await initConnection();
      // await connected()
      if (connected) {
        const g = await getSubscriptions({skus: SKU});
        setProducts(g);
        dispatch(loadingFalse());
        console.log(
          JSON.stringify(g),
          Platform.OS,
          'kdsgcusdckusdkcsdkjbckjsdbckjsdbkjcbsdj',
        );
      }
      // await flushFailedPurchasesCachedAsPendingAndroid();

      // ... rest of your code

      purchaseUpdateSubscription = purchaseUpdatedListener(purchase => {
        console.log('purchaseUpdatedListener', purchase);
        // ... rest of your code
      });

      purchaseErrorSubscription = purchaseErrorListener(error => {});
    } catch (error) {}
  };
  useEffect(() => {
    fetchData();

    // Cleanup function
    return () => {
      // if (purchaseUpdateSubscription) {
      //   purchaseUpdateSubscription.remove();
      //   purchaseUpdateSubscription = null;
      // }

      if (purchaseErrorSubscription) {
        purchaseErrorSubscription.remove();
        purchaseErrorSubscription = null;
      }
    };
  }, []); // Empty dependency array means this effect runs once, similar to componentDidMount

  return {products, buySubscription, fetchData, startTrial, userData};
}
export default useSubscriptionScreen;
