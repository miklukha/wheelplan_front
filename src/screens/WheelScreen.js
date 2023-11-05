import { View, StyleSheet, Text } from 'react-native';

export const WheelScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Wheel</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
