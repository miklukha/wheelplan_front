import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { Container, Title, Btn, SocialLogin } from '../components';
import { colors, fontSizes, utils } from '../helpers/variables';

const fullLogoPath = '../assets/images/full-logo.png';
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const initialState = {
  nickname: '',
  email: '',
  password: '',
};

export const RegisterScreen = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [passwordConformation, setPasswordConformation] = useState('');
  const [errors, setErrors] = useState('');

  const hideKeyboard = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();

    const isFormValid = formValidation();

    if (isFormValid) {
      // dispatch(authSignUpUser(state));
      setErrors('');
      setState(initialState);
      setPasswordConformation('');
    }
  };

  const formValidation = () => {
    if (
      !passwordConformation ||
      !state.password ||
      !state.nickname ||
      !state.email
    ) {
      setErrors("Всі поля обов'язкові");
      return false;
    }

    if (state.password < 6) {
      setErrors('Довжина паролю має бути довше за 6 символів');
      return false;
    }

    if (passwordConformation !== state.password) {
      setErrors('Паролі не співпадають');
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
        <View
          style={{
            ...styles.wrapper,
            marginTop: isShowKeyboard ? 20 : 60,
          }}
        >
          <Image
            source={require(fullLogoPath)}
            style={{
              ...styles.img,
              marginBottom: isShowKeyboard ? 5 : 40,
            }}
          />
          <Title
            style={{
              ...styles.title,
              marginBottom: isShowKeyboard ? 5 : 30,
            }}
          >
            Реєстрація
          </Title>
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            style={styles.formWrapper}
          >
            <View style={styles.form}>
              <View>
                <Text style={styles.inputTitle}>Ім’я*</Text>
                <TextInput
                  style={styles.input}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.nickname}
                  onChangeText={value =>
                    setState(prevState => ({ ...prevState, nickname: value }))
                  }
                />
              </View>
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
              <View>
                <Text style={styles.inputTitle}>Підтвердження пароля*</Text>
                <TextInput
                  style={styles.input}
                  secureTextEntry={true}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={passwordConformation}
                  onChangeText={value => setPasswordConformation(value)}
                />
              </View>
            </View>
            <View>{errors && <Text style={styles.error}>{errors}</Text>}</View>
            <View style={styles.btnWrapper}>
              <Btn type="accent" handleAction={handleSubmit}>
                Реєстрація
              </Btn>
              <SocialLogin />
            </View>
          </KeyboardAvoidingView>
          {/* </View> */}
        </View>
      </TouchableWithoutFeedback>
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    // paddingTop: 60,
  },
  img: {
    width: 380,
    height: 110,
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
  },
});
