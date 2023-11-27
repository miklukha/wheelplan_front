import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { colors, utils } from '../helpers/variables';
import { googleRegister } from '../redux/auth/authOperations';

export const SocialLogin = () => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.btnWrapper}
        onPress={() => googleRegister()}
      >
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
