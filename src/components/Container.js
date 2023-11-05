import { View, StyleSheet } from 'react-native';
import { colors, fontSizes } from '../helpers/variables';

export const Container = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.mainBg,
  },
});
