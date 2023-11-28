import { useState, useEffect } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import ColorPicker, { Panel3, Preview } from 'reanimated-color-picker';
import Container, { Toast } from 'toastify-react-native';
import { Btn, Container as MainContainer, Title } from '../components';
import { colors, fontSizes, utils } from '../helpers/variables';
import { getCategories } from '../services/categoriesApi';
import DateTimePicker from '@react-native-community/datetimepicker';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const initialState = {
  title: '',
  category: '',
  habitStart: '',
  deadline: '',
  value: '0', // number
};

export const GoalAddScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState('');
  const [categories, setCategories] = useState([]);
  const [deadline, setDeadline] = useState(new Date());
  const [isChecked, setIsChecked] = useState(false);

  const hideKeyboard = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const formValidation = () => {
    if (!state.title || !state.value) {
      setErrors("Назва та цінність - це обов'язкові параметри.");
      return false;
    }

    if (parseInt(state.value) > 10) {
      setErrors('Цінність має бути від 0 до 10');
      return false;
    }

    return true;
  };

  const transformDate = date => {
    const dateObject = new Date(date);
    const formattedDateString = dateObject
      .toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
      .replace(/\//g, '-');

    return formattedDateString;
  };

  const setHabitStart = () => {
    if (state.deadline !== '') {
      const transformedDate = transformDate(new Date());

      setState(prevState => ({
        ...prevState,
        habitStart: transformedDate,
      }));
    }
  };

  const handleSubmit = async () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();

    const isFormValid = formValidation();

    if (isFormValid) {
      try {
        setHabitStart();
        // const data = await addCategory({
        //   ...state,
        //   rating: parseInt(state.rating),
        // });
        // navigation.navigate({
        //   name: 'CategoriesDefault',
        //   params: { newCategory: data },
        //   merge: true,
        // });
        // setErrors('');
        // setState(initialState);
      } catch (error) {
        console.log(error);
        Toast.error('Щось пішло не так :(');
      }
    }
  };

  const renderCategories = ({ item }) => {
    const { name, color } = item;

    return (
      <Pressable
        activeOpacity={0.5}
        onPress={() => {
          setState(prevState => ({ ...prevState, category: item._id }));
        }}
        style={{
          ...styles.category,
          borderWidth: state.category === item._id ? 2 : 1,
        }}
      >
        <View style={{ ...styles.mark, backgroundColor: color }}></View>
        <Text style={styles.categoryName}>{name}</Text>
      </Pressable>
    );
  };

  const onDeadlineChange = ({ type }, date) => {
    if (type === 'set') {
      const transformedDate = transformDate(date);
      setState(prevState => ({
        ...prevState,
        deadline: transformedDate,
      }));
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        Toast.error('Щось пішло не так :(');
        console.log(error);
      }
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <MainContainer>
      <Container position="top" style={{ width: '100%' }} />
      <TouchableWithoutFeedback onPress={hideKeyboard}>
        <View style={styles.wrapper}>
          <Title style={styles.title}>Додати ціль</Title>
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            style={styles.formWrapper}
          >
            <View style={styles.form}>
              <View>
                <Text style={styles.inputTitle}>Назва цілі*</Text>
                <TextInput
                  style={styles.input}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.title}
                  onChangeText={value =>
                    setState(prevState => ({ ...prevState, title: value }))
                  }
                />
              </View>
              <SafeAreaView>
                <FlatList
                  contentContainerStyle={styles.categoriesWrapper}
                  data={categories}
                  renderItem={renderCategories}
                  keyExtractor={item => item._id}
                />
              </SafeAreaView>
              <View>
                <BouncyCheckbox
                  size={24}
                  fillColor={colors.accent}
                  unfillColor={colors.mainBg}
                  text="Регулярна ціль"
                  textStyle={{
                    fontSize: fontSizes.s,
                    textDecorationLine: 'none',
                    color: colors.auxiliaryText,
                  }}
                  innerIconStyle={{
                    borderRadius: utils.borderRadius,
                    borderColor: colors.inputBorder,
                  }}
                  onPress={isChecked => setIsChecked(isChecked)}
                />
              </View>
              {isChecked && (
                <View style={styles.deadlineWrapper}>
                  <Text style={styles.deadlineText}>Дата виконання цілі:</Text>
                  <DateTimePicker
                    value={deadline}
                    accentColor={colors.accent}
                    locale="uk"
                    minimumDate={new Date()}
                    onChange={onDeadlineChange}
                    style={{ flex: 1 }}
                  />
                </View>
              )}

              <View style={styles.estimateWrapper}>
                <View>
                  <Text style={styles.inputTitle}>
                    Цінність категорії (від 0 до 10)*
                  </Text>
                  <Text style={styles.tip}>
                    (наскільки ціль впливає на категорію)
                  </Text>
                </View>
                <TextInput
                  keyboardType="number-pad"
                  maxLength={2}
                  style={styles.estimateInput}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.rating}
                  onChangeText={value =>
                    setState(prevState => ({ ...prevState, rating: value }))
                  }
                />
              </View>
            </View>
            <View>{errors && <Text style={styles.error}>{errors}</Text>}</View>
            <View>
              <Btn type="accent" handleAction={handleSubmit}>
                Додати
              </Btn>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    height: '100%',
    paddingTop: 60,
  },
  title: {
    marginBottom: 30,
  },
  formWrapper: {
    width: '100%',
  },
  form: {
    gap: 20,
    marginBottom: 30,
  },
  inputTitle: {
    fontSize: fontSizes.s,
    marginBottom: 5,
    color: colors.auxiliaryText,
  },
  input: {
    fontSize: fontSizes.s,

    width: '100%',
    height: 50,

    paddingLeft: 15,

    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: utils.borderRadius,

    color: colors.mainText,
  },
  estimateWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    gap: 20,
  },
  estimateInput: {
    fontSize: fontSizes.s,

    width: 46,
    height: 46,

    paddingLeft: 15,

    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: utils.borderRadius,

    color: colors.mainText,
  },
  error: {
    fontSize: fontSizes.s,
    marginBottom: 30,
    color: colors.error,
  },
  tip: {
    fontSize: fontSizes.xxs,
    color: colors.auxiliaryText,
    marginBottom: 5,
  },
  btnWrapper: {
    paddingHorizontal: 20,
  },
  categoriesWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  category: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,

    padding: 10,
    marginBottom: 5,
    borderRadius: utils.borderRadius,
    borderColor: colors.inputBorder,

    backgroundColor: 'transparent',
  },
  categoryName: {
    fontSize: fontSizes.s,
    color: colors.mainText,
  },
  mark: {
    width: 10,
    height: 10,
    borderRadius: utils.borderRadius,
  },
  deadlineText: {
    fontSize: fontSizes.s,
    color: colors.auxiliaryText,
  },
  deadlineWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
