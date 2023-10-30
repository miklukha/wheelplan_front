import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, utils, fontSizes } from '../helpers/variables';

export const Btn = ({ children, type }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{
        ...styles.btn,
        backgroundColor: type === 'accent' ? colors.accent : colors.mainBg,
      }}
    >
      <Text
        style={{
          ...styles.text,
          color: type === 'accent' ? colors.whiteText : colors.mainText,
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    minWidth: 170,
    paddingVertical: 12,
    marginLeft: 30,

    borderWidth: 1,
    borderRadius: utils.borderRadius,
    borderColor: colors.inputBorder,
  },
  text: {
    fontSize: fontSizes.s,
  },
});
