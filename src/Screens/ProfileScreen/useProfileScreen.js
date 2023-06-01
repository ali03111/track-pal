import {useState} from 'react';

const useProfileScreen = ({navigate}) => {
  const dynamicNav = path => navigate(path);
  const [alert, setAlert] = useState(false);

  const onCancel = () => {
    setAlert(!alert);
  };

  return {dynamicNav, alert, onCancel};
};

export default useProfileScreen;
