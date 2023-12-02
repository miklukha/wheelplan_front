import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Toast } from 'toastify-react-native';
import { colors, fontSizes } from '../helpers/variables';
import { updateGoalStatus } from '../services/goalsApi';
import { updateRating } from '../services/categoriesApi';

export const Goal = ({ data, updateWheelScreen }) => {
  const navigation = useNavigation();

  const { index, item, category } = data;
  const { title, status, _id, value } = item;

  const [isChecked, setIsChecked] = useState(status);

  const updateCategoryRating = async operation => {
    let worth = 0;

    if (value === 0) {
      worth = 0;
    } else if (value === 10) {
      worth = 3;
    } else if (value >= 7) {
      worth = 2;
    } else if (value <= 6) {
      worth = 1;
    } else {
      worth = 0;
    }

    try {
      if (operation === '+') {
        await updateRating(category._id, {
          rating: category.rating + worth,
        });
      }

      if (operation === '-') {
        await updateRating(category._id, {
          rating: category.rating - worth,
        });
      }
    } catch (error) {
      console.log(error);
      Toast.error('Щось пішло не так :(');
    }
  };

  const handleCheck = async isChecked => {
    setIsChecked(isChecked);

    try {
      await updateGoalStatus(_id, {
        status: isChecked,
      });

      isChecked
        ? await updateCategoryRating('+')
        : await updateCategoryRating('-');

      updateWheelScreen();
    } catch (error) {
      console.log(error);
      Toast.error('Щось пішло не так :(');
    }

    setIsChecked(isChecked);
  };

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
      <BouncyCheckbox
        size={25}
        fillColor={colors.inputBorder}
        unfillColor={colors.mainBg}
        innerIconStyle={{ borderWidth: 2 }}
        isChecked={status}
        onPress={handleCheck}
      />
      <View>
        <Text
          style={{
            ...styles.name,
            textDecorationLine: isChecked ? 'line-through' : 'none',
          }}
        >
          {title}
        </Text>
        <View style={styles.category}>
          <View
            style={{
              ...styles.mark,
              backgroundColor: category?.color || colors.auxiliary,
            }}
          ></View>
          <Text style={styles.categoryName}>
            {category?.name || 'без категорії'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  goal: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: colors.auxiliary,
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
