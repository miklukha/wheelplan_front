import React, { useState } from 'react';

import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';

import { Btn, Container, Title } from '../components';
import { colors, fontSizes, utils } from '../helpers/variables';
import { login } from '../redux/auth/authOperations';

const fullLogoPath = '../assets/images/full-logo.png';
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const initialState = {
  email: '',
  password: '',
};

export const LoginScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState('');

  const dispatch = useDispatch();

  const hideKeyboard = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();

    const isFormValid = formValidation();

    if (isFormValid) {
      dispatch(login(state));
      setErrors('');
      setState(initialState);
    }
  };

  const formValidation = () => {
    if (!state.password || !state.email) {
      setErrors("Всі поля обов'язкові");
      return false;
    }

    if (!state.email.match(emailRegex)) {
      setErrors('Некоректно введена пошта');
      return false;
    }

    return true;
  };

  return (
    <Container>
      <TouchableWithoutFeedback onPress={hideKeyboard}>
        <View style={styles.wrapper}>
          <Image source={require(fullLogoPath)} style={styles.img} />
          <Title style={styles.title}>Вхід</Title>
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            style={styles.formWrapper}
          >
            <View style={styles.form}>
              <View>
                <Text style={styles.inputTitle}>Пошта*</Text>
                <TextInput
                  style={styles.input}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.email}
                  onChangeText={value =>
                    setState(prevState => ({ ...prevState, email: value }))
                  }
                />
              </View>
              <View>
                <Text style={styles.inputTitle}>Пароль*</Text>
                <TextInput
                  style={styles.input}
                  secureTextEntry={true}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.password}
                  onChangeText={value =>
                    setState(prevState => ({ ...prevState, password: value }))
                  }
                />
              </View>
            </View>
            <View>{errors && <Text style={styles.error}>{errors}</Text>}</View>
            <View style={styles.btnWrapper}>
              <Btn type="accent" handleAction={handleSubmit}>
                Логін
              </Btn>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Registration')}
              activeOpacity={0.5}
            >
              <Text style={styles.helper}>Немає акаунта? Реєстрація</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    paddingTop: 60,
  },
  img: {
    width: 380,
    height: 110,
    marginBottom: 40,
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
    fontSize: fontSizes.xs,
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
  error: {
    fontSize: fontSizes.s,
    marginBottom: 30,
    color: colors.error,
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  helper: {
    fontSize: fontSizes.xs,
    textDecorationLine: 'underline',
    color: colors.mainText,
  },
});
