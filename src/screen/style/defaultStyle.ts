import {Dimensions, StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
  darkBackground: {
    backgroundColor: '#222',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
  defaultText: {
    color: "#fff",
    fontSize: 18,
  },
});
