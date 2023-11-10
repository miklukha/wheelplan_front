import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { colors, fontSizes } from '../helpers/variables';

const categoryColor = '#00ff00';

export const Goal = ({ data }) => {
  const { index, item } = data;
  const { name, status, category } = item;

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      // onPress={() => {
      //   navigation.navigate('Category', { item });
      // }}
      style={{
        ...styles.goal,
        borderTopWidth: index === 0 ? 1 : 0,
      }}
    >
      <View style={styles.wrapper}>
        <Text style={styles.name}>{name}</Text>
        {status && (
          <AntDesign name="checkcircleo" size={20} color={colors.mainText} />
        )}
      </View>
      <View style={styles.category}>
        <View style={{ ...styles.mark, backgroundColor: categoryColor }}></View>
        <Text style={styles.categoryName}>{category}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  goal: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: colors.auxiliary,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  name: {
    fontSize: fontSizes.s,
  },
  category: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  mark: {
    width: 12,
    height: 12,
    borderRadius: '50%',
  },
  categoryName: {
    fontSize: fontSizes.xxs,
    color: colors.auxiliaryText,
  },
});
