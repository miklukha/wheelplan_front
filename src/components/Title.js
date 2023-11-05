import { Text, StyleSheet } from 'react-native';
import { colors, fontSizes } from '../helpers/variables';

export const Title = ({ children, style }) => {
  return <Text style={{ ...styles.title, ...style }}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: fontSizes.l,
    color: colors.mainText,
  },
});
