import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { Title, Container, Section } from '../components';
import { colors, fontSizes, utils } from '../helpers/variables';

export const WheelScreen = ({ navigation }) => {
  const onClick = () => {
    navigation.navigate('Categories');
  };

  return (
    <Container>
      <Section>
        <Title style={styles.title}>Колесо</Title>
        <View style={styles.descWrapper}>
          <View style={styles.estimateWrapper}>
            <Text style={styles.estimateText}>Загальна оцінка:</Text>
            <Text style={styles.estimate}>7.8</Text>
          </View>
          <TouchableOpacity
            onPress={() => onClick()}
            activeOpacity={0.5}
            style={styles.editBtn}
          >
            <MaterialIcons name="edit" size={18} color={colors.mainText} />
          </TouchableOpacity>
        </View>
      </Section>
    </Container>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 20,
  },
  descWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  estimateWrapper: {
    flexDirection: 'row',
    gap: 3,
  },
  estimateText: {
    fontSize: fontSizes.s,
  },
  estimate: {
    fontSize: fontSizes.s,
    fontWeight: '700',
  },
  editBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,

    borderWidth: 1,
    borderRadius: utils.borderRadius,
    borderColor: colors.inputBorder,
  },
});
