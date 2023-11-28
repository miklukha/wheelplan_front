import { useState } from 'react';
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
} from 'react-native';
import ColorPicker, { Panel3, Preview } from 'reanimated-color-picker';
import Container, { Toast } from 'toastify-react-native';
import { Btn, Container as MainContainer, Title } from '../components';
import { colors, fontSizes, utils } from '../helpers/variables';
import { addCategory } from '../services/categoriesApi';

const initialState = {
  name: '',
  color: '',
  rating: '0',
};

export const CategoryAddScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState('');
  const [showModal, setShowModal] = useState(false);

  const hideKeyboard = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const onSelectColor = ({ hex }) => {
    setState(prevState => ({ ...prevState, color: hex }));
  };

  const formValidation = () => {
    if (!state.name || !state.rating || !state.color) {
      setErrors("Всі поля обов'язкові");
      return false;
    }

    if (parseInt(state.rating) > 10) {
      setErrors('Оцінка має бути від 0 до 10');
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
        const data = await addCategory({
          ...state,
          rating: parseInt(state.rating),
        });
        navigation.navigate({
          name: 'CategoriesDefault',
          params: { newCategory: data },
          merge: true,
        });
        setErrors('');
        setState(initialState);
      } catch (error) {
        console.log(error);
        Toast.error('Щось пішло не так :(');
      }
    }
  };

  return (
    <MainContainer>
      <Container position="top" style={{ width: '100%' }} />
      <TouchableWithoutFeedback onPress={hideKeyboard}>
        <View style={styles.wrapper}>
          <Title style={styles.title}>Додати категорію</Title>
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            style={styles.formWrapper}
          >
            <View style={styles.form}>
              <View>
                <Text style={styles.inputTitle}>Назва категорії*</Text>
                <TextInput
                  style={styles.input}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.name}
                  onChangeText={value =>
                    setState(prevState => ({ ...prevState, name: value }))
                  }
                />
              </View>
              <View style={styles.estimateWrapper}>
                <Text style={styles.inputTitle}>
                  Оцінка категорії (від 0 до 10)*
                </Text>
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
              <View>
                <View style={styles.colorWrapper}>
                  <Text style={styles.inputTitle}>Колір:*</Text>
                  <View
                    style={{
                      ...styles.selectedColor,
                      backgroundColor: state.color
                        ? state.color
                        : 'transparent',
                    }}
                  ></View>
                </View>
                <Btn
                  handleAction={() => {
                    setShowModal(true);
                  }}
                >
                  Обрати колір
                </Btn>

                <Modal visible={showModal} animationType="slide">
                  <ColorPicker
                    style={styles.colorPicker}
                    value="red"
                    onComplete={onSelectColor}
                  >
                    <Preview
                      hideInitialColor={true}
                      style={{ marginBottom: 20 }}
                    />
                    <Panel3 />
                  </ColorPicker>
                  <View style={styles.btnWrapper}>
                    <Btn handleAction={() => setShowModal(false)}>Обрати</Btn>
                  </View>
                </Modal>
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
    gap: 15,
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
  colorWrapper: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  selectedColor: {
    width: 40,
    height: 20,
    borderRadius: '50%',
    borderWidth: 1,
    borderColor: colors.inputBorder,
  },
  colorPicker: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 100,

    marginBottom: 30,
  },
  btnWrapper: {
    paddingHorizontal: 20,
  },
});
