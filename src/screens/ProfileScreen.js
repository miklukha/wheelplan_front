import { View, StyleSheet, Text, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Title, Container, Section, Btn } from '../components';
import { colors, fontSizes, utils } from '../helpers/variables';
import { logout } from '../redux/auth/authOperations';
import { useData } from '../hooks/useData';

import React, { useState, useEffect } from 'react';

export const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const fullPath = '../assets/images/profile.png';

  const { user } = useData();

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <Container>
      <Section>
        <Title style={styles.title}>Профіль</Title>
        <View style={styles.wrapper}>
          <Image source={require(fullPath)} style={styles.img} />
          <View style={styles.textWrapper}>
            <Text style={styles.text}>{user.username}</Text>
            <Text style={styles.text}>{user.email}</Text>
          </View>
          <Btn handleAction={onLogout}>Logout</Btn>
        </View>
      </Section>
    </Container>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 20,
  },
  wrapper: {
    alignItems: 'center',
  },
  img: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  textWrapper: {
    gap: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: fontSizes.s,
    color: colors.mainText,
  },
});
