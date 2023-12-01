import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fontSizes } from '../helpers/variables';

export const Goal = ({ data }) => {
  const navigation = useNavigation();

  const { index, item, color: categoryColor, name: categoryName } = data;
  const { title, status } = item;

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => {
        navigation.navigate('Goals', { screen: 'GoalEdit', params: { item } });
      }}
      style={{
        ...styles.goal,
        borderTopWidth: index === 0 ? 1 : 0,
      }}
    >
      <View style={styles.wrapper}>
        <Text style={styles.name}>{title}</Text>
        {status && (
          <AntDesign name="checkcircleo" size={20} color={colors.mainText} />
        )}
      </View>
      <View style={styles.category}>
        <View style={{ ...styles.mark, backgroundColor: categoryColor }}></View>
        <Text style={styles.categoryName}>{categoryName}</Text>
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
