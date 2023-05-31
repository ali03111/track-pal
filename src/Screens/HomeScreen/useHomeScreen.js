import {useState} from 'react';

import {frequentTrips} from '../../Utils/localDB';

const useHomeScreen = () => {
  // const [locationInput, setLocationInput] = useState('');
  // const [destinationInput, setDestinationInput] = useState('');
  // const [GroupInput, setGroupInput] = useState('');
  // const [isModalVisible, setModalVisible] = useState(false);
  // const [isTripModalVisible, setTripModalVisible] = useState(false);
  // const [iscreateModal, setCreateModal] = useState(false);
  // const [isTripCreated, setTripCreated] = useState(false);

  const [homeStates, setHomeStates] = useState({
    locationInput: '',
    destinationInput: '',
    GroupInput: '',
    isModalVisible: false,
    isTripModalVisible: false,
    iscreateModal: false,
    isTripCreated: false,
  });

  const {
    locationInput,
    destinationInput,
    GroupInput,
    isModalVisible,
    isTripModalVisible,
    iscreateModal,
    isTripCreated,
  } = homeStates;

  const updateState = data => setHomeStates(prev => ({...prev, ...data}));

  // // Select Location Modal
  // const toggleLocationModal = () => {
  //   setModalVisible(!isModalVisible);
  // };
  // // Create Group Modal
  // const CreateGroup = () => {
  //   setCreateModal(!iscreateModal);
  // };
  // // start Trip Modal
  // const StartTripToggle = () => {
  //   setTripModalVisible(!isTripModalVisible);
  // };
  // // start Trip Modal
  // const TripCreatedToggle = () => {
  //   setTripCreated(!isTripCreated);
  // };
  return {
    frequentTrips,
    isModalVisible,
    locationInput,
    iscreateModal,
    GroupInput,
    isTripModalVisible,
    destinationInput,
    isTripCreated,
    updateState,
  };
};

export default useHomeScreen;
