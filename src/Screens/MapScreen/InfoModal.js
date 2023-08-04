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
import {dotbar, from, location} from '../../Assets';
import {frequentTrips} from '../../Utils/localDB';
import {CircleImage} from '../../Components/CircleImage';

function InfoModal({isModalVisible, toggleModal}) {
  const renderItem = useCallback(({item, index}) => {
    return (
      <View style={styles.memberList}>
        {/* <Image source={item?.image} /> */}
        <CircleImage image={item?.image} />
        <View style={styles.memberText}>
          <TextComponent text={item?.name} styles={styles.creatorName} />
        </View>
      </View>
    );
  });
  return (
    <View style={{flex: 1, backgroundColor: 'red'}}>
      <Modal
        isVisible={isModalVisible}
        animationInTiming={100}
        animationOutTiming={100}
        avoidKeyboard
        animationType="fade"
        style={styles.bottomModal}>
        <View style={styles.modalStyle}>
          <Ionicons
            name="close-outline"
            size={hp('3.5')}
            style={styles.closeIcon}
            onPress={toggleModal}
            color={Colors.gray}
          />
          <FirstCharacterComponent text={'B'} extraStyle={styles.profileText} />
          <GradientText style={styles.gText} GradientAlignment={0.7}>
            <TextComponent
              text={'Business Meets'}
              styles={styles.heading}
              numberOfLines={1}
            />
          </GradientText>
          <View style={styles.creatorInfoMain}>
            <FirstCharacterComponent
              text={'B'}
              extraStyle={styles.creatorProfile}
            />
            <View style={styles.creatorInfo}>
              <TextComponent
                text={'Alberto Smith'}
                styles={styles.creatorName}
              />
              <TextComponent
                text={'Trip Creator'}
                styles={styles.tripCreator}
              />
            </View>
          </View>
          <View style={styles.locationInfoMain}>
            <View style={styles.locationArea}>
              <Image source={location} style={styles.desImage} />
              <GradientText style={styles.LText} GradientAlignment={0.7}>
                <TextComponent
                  text={'1050 Old Nichols Rd Islandia.'}
                  styles={styles.desText}
                  numberOfLines={2}
                />
              </GradientText>
            </View>
            <Image source={dotbar} style={styles.dotbar} />
            <View style={styles.locationArea}>
              <Image source={from} style={styles.desImage} />
              <TextComponent
                text={'55 Riverview Trailer CtUnion, New Way Islandia Street.'}
                styles={styles.desText}
                numberOfLines={2}
              />
            </View>
          </View>
          <View style={styles.memberInfo}>
            <FlatList
              refreshing={false}
              data={frequentTrips}
              renderItem={renderItem}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default InfoModal;
