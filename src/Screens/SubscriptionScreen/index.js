import React, {memo} from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import CustomHeader from '../../Components/Header';
import {arrowBack, monthlyPkStar, tickSquare, triangle} from '../../Assets';
import GradientText from '../../Components/GradientText';
import {styles} from './styles';
import {hp, wp} from '../../Config/responsive';
import {TextComponent} from '../../Components/TextComponent';
import ThemeButton from '../../Components/ThemeButton';
import useSubscriptionScreen from './useSubscriptionScreen';
import {EmptyViewComp} from '../../Components/EmptyViewComp';

const details = [
  'Track where your loved ones are - keep them safe.',
  'Track each other across every mile by location sharing.',
  'Stay safe, stay connected! Share your real-time location with just a tap.',
];

function SubscriptionScreen({navigation}) {
  const {products, buySubscription, fetchData} =
    useSubscriptionScreen(navigation);
  return (
    <View style={{flex: 1}}>
      <CustomHeader
        headerTitle={'Subscription Plan'}
        backText={'Back'}
        arrowBackIcon={arrowBack}
      />
      {products.length > 0 ? (
        <>
          <GradientText style={styles.heading} GradientAlignment={0.6}>
            Choose your Plan
          </GradientText>
          <ScrollView contentContainerStyle={{flex: 1, paddingTop: hp('2')}}>
            <View style={styles.subView}>
              <Image
                source={triangle}
                style={styles.bgImage}
                resizeMode="cover"
              />
              <View style={styles.priceView}>
                <View style={styles.textView}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <GradientText
                      GradientAlignment={0.6}
                      style={{fontWeight: 'bold', fontSize: hp('3')}}>
                      {Platform.OS == 'ios'
                        ? products[1]?.localizedPrice
                        : products[1]?.subscriptionOfferDetails[0]
                            ?.pricingPhases?.pricingPhaseList[0]
                            ?.formattedPrice}
                    </GradientText>
                    <TextComponent
                      text={`/${
                        Platform.OS == 'ios'
                          ? products[1]?.title
                          : products[1]?.name
                      }`}
                    />
                  </View>
                  <Image
                    source={monthlyPkStar}
                    resizeMode="contain"
                    style={{width: wp('17'), height: hp('8')}}
                  />
                </View>
                {details?.map(res => {
                  return (
                    <View style={styles.bottomTextView}>
                      <Image
                        source={tickSquare}
                        resizeMode="contain"
                        style={{width: wp('5'), height: hp('2')}}
                      />
                      <TextComponent
                        text={res}
                        styles={{fontSize: hp('1.5'), width: wp('83')}}
                        numberOfLines={2}
                      />
                    </View>
                  );
                })}
              </View>
              <ThemeButton
                title={'Choose Plan'}
                btnStyle={styles.chooseBtn}
                onPress={() =>
                  buySubscription(
                    products[1]?.productId,
                    Platform.OS == 'android' &&
                      products[1]?.subscriptionOfferDetails[0]?.offerToken,
                  )
                }
              />
            </View>
            <View style={{...styles.subView, marginTop: hp('2')}}>
              <Image
                source={triangle}
                style={styles.bgImage}
                resizeMode="cover"
              />
              <View style={styles.priceView}>
                <View style={styles.textView}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <GradientText
                      GradientAlignment={0.6}
                      style={{fontWeight: 'bold', fontSize: hp('3')}}>
                      {Platform.OS == 'ios'
                        ? products[0]?.localizedPrice
                        : products[0]?.subscriptionOfferDetails[0]
                            ?.pricingPhases?.pricingPhaseList[0]
                            ?.formattedPrice}
                    </GradientText>
                    <TextComponent
                      text={`/${
                        Platform.OS == 'ios'
                          ? products[0]?.title
                          : products[0]?.name
                      }`}
                    />
                  </View>
                  <Image
                    source={monthlyPkStar}
                    resizeMode="contain"
                    style={{width: wp('17'), height: hp('8')}}
                  />
                </View>
                {details?.map(res => {
                  return (
                    <View style={styles.bottomTextView}>
                      <Image
                        source={tickSquare}
                        resizeMode="contain"
                        style={{width: wp('5'), height: hp('2')}}
                      />
                      <TextComponent
                        text={res}
                        styles={{fontSize: hp('1.5'), width: wp('83')}}
                      />
                    </View>
                  );
                })}
              </View>
              <ThemeButton
                title={'Choose Plan'}
                onPress={() =>
                  buySubscription(
                    products[0]?.productId,
                    Platform.OS == 'android' &&
                      products[0]?.subscriptionOfferDetails[0]?.offerToken,
                  )
                }
                btnStyle={styles.chooseBtn}
              />
            </View>
          </ScrollView>
        </>
      ) : (
        <EmptyViewComp onRefresh={fetchData} />
      )}
    </View>
  );
}
export default memo(SubscriptionScreen);
