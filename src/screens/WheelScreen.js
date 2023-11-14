import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { Title, Container, Section } from '../components';
import { colors, fontSizes, utils } from '../helpers/variables';
import { categories } from '../helpers/categories';

import React, { useState, useEffect } from 'react';

export const WheelScreen = ({ navigation }) => {
  const [data, setData] = useState(categories);

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
        <View style={styles.wheel}></View>
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
    marginBottom: 20,
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
  wheel: {},
});
