const useProfileScreen = ({navigate}) => {
  const dynamicNav = path => navigate(path);

  return {dynamicNav};
};

export default useProfileScreen;
