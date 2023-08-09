const getCredentials = () => {
  if (__DEV__)
    return {
      baseURL: 'https://virtualrealitycreators.com/trackpal/api/',
      imageURL: 'https://virtualrealitycreators.com/trackpal/public/',
    };
  else {
    console.log = () => {};
    return {
      baseURL: 'https://virtualrealitycreators.com/trackpal/api/',
      imageURL: 'https://virtualrealitycreators.com/trackpal/public/',
    };
  }
};

export const {baseURL, imageURL} = getCredentials();

export const apendUrl = url => {
  return baseURL + url;
};
export const imageUrl = url => {
  console.log(url, 'sdfksdfl;jlsdkj');
  return url ? imageURL + url : '';
  // : 'https://res.cloudinary.com/dd6tdswt5/image/upload/v1684830799/UserImages/mhysa2zj0sbmvnw69b35.jpg';
};

export const telematicsInstanceId = 'cf0181ae-87bb-4eda-9ca6-9cda6d773b5b';
export const telematicsInstanceKey = '38ade545-dbbe-409a-8fba-f6f8817ffeca';

export const telematicsCreateUser =
  'https://user.telematicssdk.com/v1/Registration/create';
export const telematicsLoginUser =
  'https://user.telematicssdk.com/v1/Auth/Login';

export const firebaseDataBaseURL =
  'https://track-pal-e4e07-default-rtdb.firebaseio.com/';

export const registerUrl = 'firebase-signup';
export const loginUrl = 'firebase-login';
export const logoutUrl = 'auth/logout';
export const fcmToken = 'add-fcm-token';
export const getAgoraTokenUrl = 'getAccessToken/';
export const userTrips = '/user-trips';
export const notificationUrl = '/notifications';
export const changeUserTripStatus = '/change-user-trip-status';
export const getAllUser = 'users';
export const CreateTripUrl = '/create-trip';
export const tripsData = '/owner-trips';
export const changeOwnerStatusUrl = '/change-owner-status';
export const changeMemberStatusUrl = '/change-member-status';
export const UpdateProfileUrl = 'update-profile';
export const SOSToMembers = 'sendNotificationToAllTripMembers?trip_id=';
