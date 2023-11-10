import { useState } from 'react';
import React from 'react';

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { Title, Container, Section, Btn } from '../components';
import { colors, fontSizes } from '../helpers/variables';
import { categories } from '../helpers/categories';

export const CategoriesDefaultScreen = ({ navigation }) => {
  const [data, setData] = useState(categories);

  const renderItems = ({ index, item }) => {
    const { name, color } = item;

    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          navigation.navigate('Category', { item });
        }}
        style={{
          ...styles.item,
          borderTopWidth: index === 0 ? 1 : 0,
        }}
      >
        <Text style={styles.name}>{name}</Text>
        <View style={{ ...styles.mark, backgroundColor: color }}></View>
      </TouchableOpacity>
    );
  };

  const onClick = () => {
    console.log('add categories');
  };

  return (
    <Container>
      <Section>
        <Title style={styles.title}>Категорії</Title>
        <SafeAreaView style={styles.wrapper}>
          <FlatList
            data={data}
            renderItem={renderItems}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
        <Btn type="accent" handleAction={onClick}>
          Додати нову категорію
        </Btn>
      </Section>
    </Container>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 20,
  },
  wrapper: {
    marginBottom: 30,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderColor: colors.auxiliary,
  },
  mark: {
    width: 20,
    height: 20,
    borderRadius: '50%',
  },
  name: {
    fontSize: fontSizes.s,
  },
});
