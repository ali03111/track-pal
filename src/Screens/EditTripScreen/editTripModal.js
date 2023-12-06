import React, {useCallback, useState} from 'react';
import {
  Button,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  TextInput,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import {styles} from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../Theme/Variables';
import {hp, wp} from '../../Config/responsive';
import GradientText from '../../Components/GradientText';
import {FirstCharacterComponent} from '../../Components/FirstCharacterComponent';
import {TextComponent} from '../../Components/TextComponent';
import {
  addProfileImage,
  addUserCircle,
  bgBlur,
  dotbar,
  editIcon,
  from,
  location,
  userMinus,
} from '../../Assets';
import {CircleImage} from '../../Components/CircleImage';
import {imageUrl} from '../../Utils/Urls';
import {Touchable} from '../../Components/Touchable';
import ThemeButton from '../../Components/ThemeButton';
import Overlay from '../../Components/Overlay';
import useReduxStore from '../../Hooks/UseReduxStore';

function EditTripModal({
  isModalVisible,
  toggleModal,
  tripData,
  userData,
  keyboardType,
  uploadFromGalary,
  tripPicture,
  openMembersModal,
  tripMemebers,
  changeName,
  tripName,
  updateTripData,
  updateError,
}) {
  const {getState} = useReduxStore();
  const {isloading} = getState('isloading');
  let IOSPlatform = Boolean(Platform.OS == 'android');

  const renderItem = useCallback(({item, index}) => {
    var color =
      index.toString().length === 1 ? index : index.toString().split('').pop();
    return (
      <View style={styles.memberList}>
        {/* <Image source={item?.image} /> */}
        {item?.profile_image ? (
          <CircleImage image={imageUrl(item?.profile_image)} uri={true} />
        ) : (
          <FirstCharacterComponent indexNumber={color} text={item.name} />
        )}
        <View style={styles.memberText}>
          <TextComponent text={item.name} styles={styles.creatorName} />

          {
            item.id == userData.id && (
              <>
                <TextComponent text={'Creator'} styles={styles.creator} />
              </>
            )
            //   : (
            //     <Touchable>
            //       <Image
            //         source={userMinus}
            //         resizeMode="contain"
            //         style={styles.userImageStyle}
            //       />
            //     </Touchable>
            //   )
          }
        </View>
      </View>
    );
  });
  return (
    <View>
      <Modal
        isVisible={isModalVisible}
        animationInTiming={100}
        animationOutTiming={100}
        // avoidKeyboard={true}
        animationType="fade"
        style={styles.bottomModal}>
        <View
          style={{flex: 1, justifyContent: 'flex-end', position: 'relative'}}>
          {isloading && <Overlay />}
          <Image style={styles.absolute} source={bgBlur} />
          <View style={styles.modalStyle(keyboardType, IOSPlatform)}>
            <Ionicons
              name="close-outline"
              size={hp('3.5')}
              style={styles.closeIcon}
              onPress={toggleModal}
              color={Colors.gray}
            />
            {tripData?.image || tripPicture?.uri ? (
              <CircleImage
                uri={true}
                image={tripPicture?.uri ?? imageUrl(tripData?.image)}
                styles={styles.profileText}
              />
            ) : (
              <FirstCharacterComponent
                text={tripName ?? tripData?.name}
                extraStyle={styles.profileText}
              />
            )}
            <Touchable
              // onPress={clearImage}
              onPress={uploadFromGalary}
              Opacity={0.8}
              style={styles.addImageBtn}>
              <Image source={addProfileImage} style={styles.addImageIcon} />
            </Touchable>
            <View style={styles.editInput}>
              <Image source={editIcon} style={styles.editIcon} />
              <TextInput
                style={styles.eInput}
                // defaultValue={tripData?.name}
                onChangeText={e => changeName(e)}
                value={tripName ?? tripData?.name}
                //   placeholder="Name your Trip"
                //   placeholderTextColor={'gray'}
              />
            </View>
            <TextComponent
              text={updateError ?? ''}
              styles={styles.tripNameError}
            />
            {/* <GradientText style={styles.gText} GradientAlignment={0.7}>
            <TextComponent
              text={tripData?.name}
              styles={styles.heading}
              numberOfLines={1}
            />
          </GradientText> */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: hp('5')}}>
              <View style={styles.creatorInfoMain}>
                {userData?.image ? (
                  <CircleImage uri={true} image={imageUrl(tripData?.image)} />
                ) : (
                  <FirstCharacterComponent text={userData?.name} />
                )}
                <View style={styles.creatorInfo}>
                  <TextComponent
                    text={userData?.name}
                    styles={styles.creatorName}
                  />
                  <TextComponent
                    text={'Trip Creator'}
                    styles={styles.tripCreator}
                  />
                </View>
              </View>
              <View style={styles.locationInfoMain}>
                <View style={styles.destinationArea}>
                  <Image source={from} style={styles.desImage} />
                  <TextComponent
                    text={tripData?.end_destination_description}
                    styles={styles.desText}
                  />
                </View>
              </View>
              <View style={styles.memberHeadingView}>
                <TextComponent text={'Members'} styles={styles.memberHeading} />
                <Touchable style={styles.addButton} onPress={openMembersModal}>
                  <TextComponent
                    text={'Add'}
                    styles={{textAlign: 'right', marginRight: wp('1')}}
                  />
                  <Image
                    source={addUserCircle}
                    resizeMode="contain"
                    style={styles.userImageStyle}
                  />
                </Touchable>
              </View>
              <View style={styles.memberInfo}>
                <FlatList
                  refreshing={false}
                  data={tripData?.users}
                  renderItem={renderItem}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                />
              </View>
              <ThemeButton
                title={'Save'}
                onPress={updateTripData}
                btnStyle={styles.groupBtn}
              />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default EditTripModal;
