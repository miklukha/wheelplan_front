import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { colors, utils } from '../helpers/variables';

export const SocialLogin = () => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.btnWrapper}>
        <FontAwesome name="apple" size={24} color={colors.mainText} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnWrapper}>
        <AntDesign name="google" size={24} color={colors.mainText} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    gap: 10,
  },

  btnWrapper: {
    alignItems: 'center',
    justifyContent: 'center',

    width: 40,
    height: 40,

    borderWidth: 1,
    borderRadius: utils.borderRadius,
    borderColor: colors.inputBorder,
  },
});
