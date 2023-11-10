import { View, StyleSheet } from 'react-native';

export const Section = ({ children }) => {
  return <View style={styles.section}>{children}</View>;
};

const styles = StyleSheet.create({
  section: {
    paddingTop: 50,
  },
});
