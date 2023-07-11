import React from 'react';
import {View, Text} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Colors} from '../Theme/Variables';
import {hp, wp} from '../Config/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
export const AutoFillGoogleComp = ({
  handleButtonClick,
  inputContainerStyle,
  inputPlaceHolder,
  inputVal,
  onChangeText,
  key,
  defaultValue,
}) => {
  return (
    <GooglePlacesAutocomplete
      textInputProps={{
        placeholderTextColor: Colors.gray,
        value: inputVal,
        onChangeText: text => {
          onChangeText(text);
          // Update the state with the current input text
        },
        defaultValue: defaultValue,
      }}
      placeholder={inputPlaceHolder}
      returnKeyType="default"
      fetchDetails={true}
      key={key}
      // currentLocation={true}
      //   listViewDisplayed
      // currentLocationLabel=" "
      isRowScrollable={true}
      keepResultsAfterBlur={false}
      enablePoweredByContainer={false}
      predefinedPlacesAlwaysVisible
      listViewDisplayed="auto"
      styles={{
        container: {
          ...inputContainerStyle,
          zIndex: 1,
          height: 'auto',
          overflow: 'hidden',
          maxHeight: hp('18'),
          //   position: 'absolute',
        }, // Added to adjust container flex
        textInputContainer: {
          height: hp('5.3'),
          overflow: 'hidden',
        },
        // Modified placeholder style

        textInput: {
          color: 'black',
          fontSize: hp('1.8'),
          backgroundColor: 'white',
          //   flex: 1,
        },
        predefinedPlacesDescription: {
          color: 'black',
        },
        listView: {
          marginTop: 0,
          padding: 0,
        },
        separator: {
          height: 0.5,
          backgroundColor: '#c8c7cc',
        },
        description: {
          width: wp('85'),
          color: Colors.gray,
        },
        loader: {
          flexDirection: 'row',
          justifyContent: 'flex-end',
        },
      }}
      //   renderSeparator={() => (
      //     <View style={{height: 1, backgroundColor: 'lightgray'}} />
      //   )}
      //   renderRow={prediction => (
      //     <View style={{backgroundColor: 'red', position: 'absolute'}}>
      //       <Text>{prediction.description}</Text>
      //       {/* Render each prediction item */}
      //     </View>
      //   )}
      //   renderLeftButton={() => (
      //     <Ionicons
      //       name="search"
      //       size={30}
      //       color={Colors.primaryColor}
      //       style={{marginLeft: 10}}
      //     />
      //   )}
      onPress={(data, details = null) => {
        const {lat, lng} = details.geometry.location;
        handleButtonClick({
          ...data,
          coords: {
            latitude: lat,
            longitude: lng,
          },
        });
        // handleButtonClick(data,{ lat, lng });
      }}
      query={{
        key: 'AIzaSyBlHyVz90xxc4lkp-1jGq68Ypmgnw4WCFE',
        language: 'en',
        components: 'country:us',
      }}
    />
  );
};
