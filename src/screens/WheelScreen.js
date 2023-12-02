import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { Toast } from 'toastify-react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryPolarAxis,
  VictoryTheme,
} from 'victory-native';
import { Container, Section, Title, Goal } from '../components';
import { colors, fontSizes, utils } from '../helpers/variables';
import { getCategories } from '../services/categoriesApi';
import { getGoals } from '../services/goalsApi';

export const WheelScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [goals, setGoals] = useState([]);

  const onClick = () => {
    navigation.navigate('Categories');
  };

  const getCategory = categoryId => {
    return categories.find(category => categoryId === category._id);
  };

  const renderGoals = data => {
    const category = getCategory(data.item.category);
    return <Goal data={{ ...data, category }} />;
  };

  const calculateEstimate = () => {
    const sum = categories.reduce((sum, category) => {
      return (sum += category.rating);
    }, 0);

    return (sum / categories.length).toFixed(1);
  };

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const categoriesData = await getCategories();
          setCategories(categoriesData);

          const goalsData = await getGoals();
          setGoals(goalsData);
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
        <Title style={styles.title}>Колесо</Title>
        <View style={styles.descWrapper}>
          <View style={styles.estimateWrapper}>
            <Text style={styles.estimateText}>Загальна оцінка:</Text>
            <Text style={styles.estimate}>{calculateEstimate()}</Text>
          </View>
          <TouchableOpacity
            onPress={() => onClick()}
            activeOpacity={0.5}
            style={styles.editBtn}
          >
            <MaterialIcons name="edit" size={18} color={colors.mainText} />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center' }}>
          {categories.length !== 0 && (
            <VictoryChart
              polar
              theme={VictoryTheme.material}
              width={400}
              height={400}
            >
              {categories.map(({ name, _id }) => {
                return (
                  <VictoryPolarAxis
                    domain={[0, 10]}
                    dependentAxis
                    key={_id}
                    label={name}
                    labelPlacement="perpendicular"
                    style={{
                      tickLabels: { fill: 'none' },
                      axisLabel: {
                        fill: colors.mainText,
                      },
                      axis: { stroke: 'none' },
                    }}
                    axisValue={name}
                  />
                );
              })}
              <VictoryBar
                barWidth={360 / categories.length}
                data={categories.map(({ name, rating, color }) => {
                  return {
                    x: name,
                    y: rating,
                    color,
                  };
                })}
                style={{
                  data: { fill: ({ datum }) => datum.color && datum.color },
                  labels: {
                    fontWeight: '700',
                    fill: colors.mainText,
                  },
                }}
                labels={({ datum }) => datum.y}
              />
            </VictoryChart>
          )}
        </View>
        <Text style={styles.text}>Цілі</Text>
        <SafeAreaView>
          <FlatList
            data={goals}
            renderItem={renderGoals}
            keyExtractor={item => item._id}
            style={styles.goalsWrapper}
          />
        </SafeAreaView>
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
  text: {
    fontSize: fontSizes.m,
    fontWeight: '500',
    marginBottom: 10,
    color: colors.mainText,
  },
  goalsWrapper: {
    position: 'absolute',
    zIndex: 10,
    width: '100%',
    height: 200,
  },
});
