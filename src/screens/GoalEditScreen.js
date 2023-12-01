import { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Container, { Toast } from 'toastify-react-native';
import { Btn, Container as MainContainer, Title } from '../components';
import { colors, fontSizes, utils } from '../helpers/variables';
import { getCategoryById } from '../services/categoriesApi';
import { deleteGoal, updateGoal } from '../services/goalsApi';

export const GoalEditScreen = ({ navigation, route }) => {
  const { item } = route.params;

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState({ ...item, value: `${item.value}` });
  const [errors, setErrors] = useState('');
  const [category, setCategory] = useState({});

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

  const handleSubmit = async () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();

    const isFormValid = formValidation();

    if (isFormValid) {
      try {
        const data = await updateGoal(item._id, {
          value: parseInt(state.value),
          title: state.title,
          category: state.category,
        });
        navigation.navigate('Wheel');
        setErrors('');
      } catch (error) {
        console.log(error);
        Toast.error('Щось пішло не так :(');
      }
    }
  };

  const onDelete = async () => {
    try {
      await deleteGoal(item._id);
      navigation.navigate('Wheel');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCategoryById(item.category);
        setCategory(data);
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
          <Title style={styles.title}>Редагувати ціль</Title>
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
              <View>
                <Text style={styles.inputTitle}>Назва категорії</Text>
                <Text style={{ ...styles.categoryName, fontWeight: '700' }}>
                  {category.name}
                </Text>
              </View>
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
                  value={state.value}
                  onChangeText={value =>
                    setState(prevState => ({ ...prevState, value }))
                  }
                />
              </View>
            </View>
            <View>{errors && <Text style={styles.error}>{errors}</Text>}</View>
            <View style={styles.btnsWrapper}>
              <Btn type="accent" handleAction={handleSubmit}>
                Змінити
              </Btn>
              <Btn handleAction={onDelete}>Видалити</Btn>
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
  categoryName: {
    fontSize: fontSizes.s,
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
  btnsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
