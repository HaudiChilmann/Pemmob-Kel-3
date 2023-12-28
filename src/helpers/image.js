import { Image } from 'react-native';

export const CachedImage = (props) => {
  const { uri } = props;

  return <Image source={{ uri }} {...props} />;
};
