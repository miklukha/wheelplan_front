import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { Btn, Container, Section, Title, Goal } from '../components';
import { goals } from '../helpers/categories';
import { colors, fontSizes, utils } from '../helpers/variables';

export const CategoryScreen = ({ route }) => {
  const { name, color, rating } = route.params.item;
  const [data, setData] = useState(goals);

  const renderItems = data => {
    return <Goal data={data} />;
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
            data={data}
            renderItem={renderItems}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
        <View style={styles.btnsWrapper}>
          <Btn type="accent" handleAction={() => console.log('change')}>
            Редагувати
          </Btn>
          <Btn handleAction={() => console.log('delete')}>Видалити</Btn>
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
