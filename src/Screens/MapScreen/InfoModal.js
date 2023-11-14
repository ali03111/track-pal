import React, {useCallback, useState} from 'react';
import {Button, Text, View, Image, ScrollView, FlatList} from 'react-native';
import Modal from 'react-native-modal';
import useMapScreen from './useMapScreen';
import {styles} from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../Theme/Variables';
import {hp} from '../../Config/responsive';
import GradientText from '../../Components/GradientText';
import {FirstCharacterComponent} from '../../Components/FirstCharacterComponent';
import {TextComponent} from '../../Components/TextComponent';
import {bgBlur, dotbar, from, location} from '../../Assets';
import {frequentTrips} from '../../Utils/localDB';
import {CircleImage} from '../../Components/CircleImage';
import {imageUrl} from '../../Utils/Urls';

function InfoModal({
  isModalVisible,
  toggleModal,
  tripData,
  currentUser,
  tripInfo,
  allMember,
  userData,
}) {
  const tripDatddda = userData.id;
  const {email} = userData;
  console.log('asd  test', tripInfo);
  console.log(
    'asdasdasdasdasdasasdaasdasdassdasdasasdasdasdas dasddsaadsfasfasassadas',
    tripInfo?.members?.filter(res => res.details.email == email),
    userData.id,
  );
  // console.log('asd ', tripData);

  const renderItem = useCallback(({item, index}) => {
    var color =
      index.toString().length === 1 ? index : index.toString().split('').pop();
    return (
      <View style={styles.memberList}>
        {/* <Image source={item?.image} /> */}
        {item.details?.profile_image ? (
          <CircleImage
            image={imageUrl(item.details?.profile_image)}
            uri={true}
          />
        ) : (
          <FirstCharacterComponent
            indexNumber={color}
            text={item.details.name}
          />
        )}
        <View style={styles.memberText}>
          <TextComponent text={item.details.name} styles={styles.creatorName} />

          {item.details.id == tripInfo.tripCreator.id && (
            <>
              <TextComponent text={'Creator'} styles={styles.creator} />
            </>
          )}
        </View>
      </View>
    );
  });
  return (
    <View style={{flex: 1}}>
      <Modal
        isVisible={isModalVisible}
        animationInTiming={100}
        animationOutTiming={100}
        avoidKeyboard
        animationType="fade"
        style={styles.bottomModal}>
        <Image style={styles.absolute} source={bgBlur} />
        <View style={styles.modalStyle}>
          <Ionicons
            name="close-outline"
            size={hp('3.5')}
            style={styles.closeIcon}
            onPress={toggleModal}
            color={Colors.gray}
          />
          {/* {tripData?.image ? (
            <CircleImage uri={true} image={imageUrl(tripData?.image)} />
          ) : (
            <FirstCharacterComponent
              text={tripData?.name}
              extraStyle={styles.profileText}
            />
          )} */}

          <GradientText style={styles.gText} GradientAlignment={0.7}>
            <TextComponent
              text={tripData?.name}
              styles={styles.heading}
              numberOfLines={1}
            />
          </GradientText>
          <ScrollView>
            <View style={styles.creatorInfoMain}>
              {tripInfo.tripCreator?.image ? (
                <CircleImage
                  uri={true}
                  image={imageUrl(tripInfo.tripCreator?.image)}
                />
              ) : (
                <FirstCharacterComponent text={tripInfo.tripCreator?.name} />
              )}
              <View style={styles.creatorInfo}>
                <TextComponent
                  text={tripInfo.tripCreator?.name}
                  styles={styles.creatorName}
                />
                <TextComponent
                  text={'Trip Creator'}
                  styles={styles.tripCreator}
                />
              </View>
            </View>
            <View style={styles.locationInfoMain}>
              {!tripData.owner && (
                <>
                  <View style={styles.locationArea}>
                    <Image source={location} style={styles.locImage} />
                    <GradientText style={styles.LText} GradientAlignment={0.7}>
                      <TextComponent
                        // text={
                        //   tripInfo.members?.filter(
                        //     res => res.id == userData.id,
                        //   )[0] ?? 'sdsd'
                        // }
                        text={
                          tripInfo?.members?.filter(
                            res => res.details.email == email,
                          )[0]?.description
                        }
                        styles={styles.desText}
                      />
                    </GradientText>
                  </View>
                  {/* <View style={styles.dotImage}>
                    <Image source={dotbar} style={styles.dotbar} />
                  </View> */}
                </>
              )}
              <View style={styles.destinationArea}>
                <Image source={from} style={styles.desImage} />
                <TextComponent
                  text={tripInfo.destination?.description}
                  styles={styles.desText}
                />
              </View>
            </View>
            <View style={styles.memberInfo}>
              <FlatList
                refreshing={false}
                data={tripInfo?.members}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

export default InfoModal;
