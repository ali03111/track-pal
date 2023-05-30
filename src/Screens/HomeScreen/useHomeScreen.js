import {useState} from 'react';

import {frequentTrips} from '../../Utils/localDB';

const useHomeScreen = () => {
  const [locationInput, setLocationInput] = useState('');
  const [destinationInput, setDestinationInput] = useState('');
  const [GroupInput, setGroupInput] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isTripModalVisible, setTripModalVisible] = useState(false);
  const [iscreateModal, setCreateModal] = useState(false);
  const [isTripCreated, setTripCreated] = useState(false);
  // Select Location Modal
  const toggleLocationModal = () => {
    setModalVisible(!isModalVisible);
  };
  // Create Group Modal
  const CreateGroup = () => {
    setCreateModal(!iscreateModal);
  };
  // start Trip Modal
  const StartTripToggle = () => {
    setTripModalVisible(!isTripModalVisible);
  };
  // start Trip Modal
  const TripCreatedToggle = () => {
    setTripCreated(!isTripCreated);
  };
  return {
    frequentTrips,
    setModalVisible,
    isModalVisible,
    toggleLocationModal,
    locationInput,
    setLocationInput,
    iscreateModal,
    setCreateModal,
    CreateGroup,
    GroupInput,
    setGroupInput,
    StartTripToggle,
    setTripModalVisible,
    isTripModalVisible,
    destinationInput,
    setDestinationInput,
    TripCreatedToggle,
    setTripCreated,
    isTripCreated,
  };
};

export default useHomeScreen;
