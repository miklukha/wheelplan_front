import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Btn, Container, Goal, Section, Title } from '../components';
import { colors, fontSizes, utils } from '../helpers/variables';
import { deleteCategory } from '../services/categoriesApi';
import { getGoalsByCategory } from '../services/goalsApi';

export const CategoryScreen = ({ navigation, route }) => {
  const { name, color, rating, _id } = route.params.item;
  const [goals, setGoals] = useState([]);

  const renderItems = data => {
    return <Goal data={{ ...data, category: route.params.item }} />;
  };

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const data = await getGoalsByCategory(_id);
          setGoals(data);
        } catch (error) {
          Toast.error('Щось пішло не так :(');
          console.log(error);
        }
      };

      fetchData().catch(console.error);
    }, []),
  );

  const onDelete = async () => {
    try {
      await deleteCategory(_id);
      navigation.navigate('CategoriesDefault');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Section>
        <Title style={styles.title}>Категорія</Title>
        <View style={{ ...styles.descWrapper, borderColor: color }}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.estimateWrapper}>
            <Text style={styles.estimateText}>Оцінка:</Text>
            <Text style={styles.estimate}>{rating}</Text>
          </View>
        </View>
        <SafeAreaView style={styles.goalsWrapper}>
          <FlatList
            data={goals}
            renderItem={renderItems}
            keyExtractor={item => item._id}
          />
        </SafeAreaView>
        <View style={styles.btnsWrapper}>
          <Btn
            type="accent"
            handleAction={() =>
              navigation.navigate('CategoryEdit', { item: route.params.item })
            }
          >
            Редагувати
          </Btn>
          <Btn handleAction={onDelete}>Видалити</Btn>
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

    marginBottom: 30,
    padding: 10,
    borderWidth: 2,
    borderRadius: utils.borderRadius,
  },
  mark: {
    width: 60,
    height: 20,
    borderRadius: 20,
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
  goalsWrapper: {
    marginBottom: 30,
  },
  goal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderColor: colors.auxiliary,
  },
  name: {
    fontSize: fontSizes.s,
  },
  btnsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
