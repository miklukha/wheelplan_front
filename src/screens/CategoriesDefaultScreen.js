import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Toast } from 'toastify-react-native';
import { Btn, Container, Section, Title } from '../components';
import { colors, fontSizes } from '../helpers/variables';
import { getCategories } from '../services/categoriesApi';

export const CategoriesDefaultScreen = ({ navigation }) => {
  const [data, setData] = useState([]);

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

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const data = await getCategories();
          setData(data);
        } catch (error) {
          Toast.error('Щось пішло не так :(');
          console.log(error);
        }
      };

      fetchData().catch(console.error);
    }, []),
  );

  return (
    <Container>
      <Section>
        <Title style={styles.title}>Категорії</Title>
        <SafeAreaView style={styles.wrapper}>
          <FlatList
            data={data}
            renderItem={renderItems}
            keyExtractor={item => item._id}
          />
        </SafeAreaView>
        <Btn
          type="accent"
          handleAction={() => {
            navigation.navigate('CategoryAdd');
          }}
        >
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
