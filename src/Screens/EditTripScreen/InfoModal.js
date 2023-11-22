import React, {useCallback, useState} from 'react';
import {Button, Text, View, Image, ScrollView, FlatList} from 'react-native';
import Modal from 'react-native-modal';
import {styles} from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../Theme/Variables';
import {hp} from '../../Config/responsive';
import GradientText from '../../Components/GradientText';
import {FirstCharacterComponent} from '../../Components/FirstCharacterComponent';
import {TextComponent} from '../../Components/TextComponent';
import {bgBlur, dotbar, from, location} from '../../Assets';
import {CircleImage} from '../../Components/CircleImage';
import {imageUrl} from '../../Utils/Urls';

function InfoModal({isModalVisible, toggleModal, tripData, userData}) {
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

          {item.id == userData.id && (
            <>
              <TextComponent text={'Creator'} styles={styles.creator} />
            </>
          )}
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
          {tripData?.image ? (
            <CircleImage
              uri={true}
              image={imageUrl(tripData?.image)}
              styles={styles.profileText}
            />
          ) : (
            <FirstCharacterComponent
              text={tripData?.name}
              extraStyle={styles.profileText}
            />
          )}

          <GradientText style={styles.gText} GradientAlignment={0.7}>
            <TextComponent
              text={tripData?.name}
              styles={styles.heading}
              numberOfLines={1}
            />
          </GradientText>
          <ScrollView>
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
            <View style={styles.memberInfo}>
              <FlatList
                refreshing={false}
                data={tripData?.users}
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
