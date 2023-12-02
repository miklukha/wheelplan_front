import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Toast } from 'toastify-react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryPolarAxis,
  VictoryTheme,
} from 'victory-native';
import { Container, Section, Title } from '../components';
import { colors, fontSizes, utils } from '../helpers/variables';
import { getCategories } from '../services/categoriesApi';

export const WheelScreen = ({ navigation }) => {
  const [data, setData] = useState([]);

  const onClick = () => {
    navigation.navigate('Categories');
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
        <View style={{ alignItems: 'center' }}>
          {data.length !== 0 && (
            <VictoryChart
              polar
              theme={VictoryTheme.material}
              width={400}
              height={400}
            >
              {data.map(({ name, _id }) => {
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
                barWidth={360 / data.length}
                data={data.map(({ name, rating, color }) => {
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
  wheel: {
    // alignItems: 'center',
  },
});
