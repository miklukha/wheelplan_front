import { Container, Btn, SocialLogin } from '../components';
import { Text, StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { colors, fontSizes } from '../helpers/variables';

const titleImgPath = '../assets/images/title.png';
const logoPath = '../assets/images/logo.png';

export const MainScreen = ({ navigation }) => {
  return (
    <Container>
      <View style={styles.wrapper}>
        <Image source={require(titleImgPath)} style={styles.titleImg} />
        <Text style={styles.idea}>Збалансуй свої цілі!</Text>
        <Image source={require(logoPath)} style={styles.logo} />
        <View style={styles.btnWrapper}>
          <Btn
            type="accent"
            handleAction={() => navigation.navigate('Registration')}
          >
            Реєстрація
          </Btn>
          <Btn handleAction={() => navigation.navigate('Login')}>Логін</Btn>
        </View>
        <View style={styles.anotherWay}>
          <View style={styles.continueWrapper}>
            <Text style={styles.text}>Або продовжити з</Text>
            <Text style={styles.emphasizedText}>Apple, Google</Text>
          </View>
          <SocialLogin />
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    paddingTop: 130,
  },
  titleImg: {
    width: '90%',
    marginBottom: 20,
  },
  idea: {
    fontSize: fontSizes.m,
    fontWeight: '700',
    textTransform: 'uppercase',

    marginBottom: 70,
    color: colors.accent,
  },
  logo: {
    width: 340,
    height: 340,
    marginBottom: 70,
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    width: '100%',
    marginBottom: 20,
  },
  anotherWay: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  continueWrapper: {
    flexDirection: 'row',
    gap: 4,
  },
  text: {
    fontSize: fontSizes.xs,
  },
  emphasizedText: {
    fontWeight: '700',
    fontSize: fontSizes.xs,
  },
});
