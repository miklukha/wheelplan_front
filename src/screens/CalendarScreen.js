import {
  Alert,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Title, Container, Section, Goal } from '../components';
import { colors, fontSizes, utils } from '../helpers/variables';
import { Agenda, LocaleConfig } from 'react-native-calendars';
import { useEffect, useState } from 'react';
import { useData } from '../hooks/useData';

const imgPath = '../assets/images/achievement.png';

LocaleConfig.locales['uk'] = {
  monthNames: [
    'Січень',
    'Лютий',
    'Березень',
    'Квітень',
    'Травень',
    'Червень',
    'Липень',
    'Серпень',
    'Вересень',
    'Жовтень',
    'Листопад',
    'Грудень',
  ],
  monthNamesShort: [
    'Січ.',
    'Лют.',
    'Бер.',
    'Квіт.',
    'Трав.',
    'Черв.',
    'Лип.',
    'Сер.',
    'Вер.',
    'Жов.',
    'Лис.',
    'Груд.',
  ],
  dayNames: [
    'Неділя',
    'Понеділок',
    'Вівторок',
    'Середа',
    'Четвер',
    "П'ятниця",
    'Субота',
  ],
  dayNamesShort: ['Нд.', 'Пн.', 'Вт.', 'Ср.', 'Чт.', 'Пт.', 'Сб.'],
  today: 'Сьогодні',
};

LocaleConfig.defaultLocale = 'uk';

const actualDate = new Date().toISOString().split('T')[0];

const goalsFromDatabase = [
  {
    id: '0',
    name: 'Ціль 1',
    status: false,
    category: 'Стосунки',
    habitStart: '2023-11-19',
    deadline: '2023-11-20',
  },
  {
    id: '1',
    name: 'Ціль 2',
    status: true,
    category: 'Гроші',
    habitStart: '2023-11-11',
    deadline: '2023-11-20',
  },
  {
    id: '2',
    name: 'Ціль 3',
    status: false,
    category: 'Гроші',
  },
];

export const CalendarScreen = () => {
  const [items, setItems] = useState({});
  const [selected, setSelected] = useState('');
  const [currentDay, setCurrentDay] = useState('');

  const getGoalsForDay = day => {
    return goalsFromDatabase.filter(
      goal => goal.habitStart <= day && day <= goal.deadline,
    );
  };

  const loadItems = ({ dateString }) => {
    const newItems = { ...items };
    const goalsForDay = getGoalsForDay(dateString);

    newItems[dateString] = goalsForDay;
    setItems(newItems);
  };

  const renderItem = item => {
    const data = {
      index: 0,
      item,
    };
    return <Goal data={data} />;
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.achievementWrapper}>
        <Image source={require(imgPath)} style={styles.img} />
        <Text>Найкращий час, щоб почати - це ЗАРАЗ</Text>
      </View>
    );
  };

  // useEffect(() => {
  //   // loadItems();
  // }, []);

  return (
    <Container style={styles.container}>
      <Title style={styles.title}>Календар</Title>
      {/* <View style={styles.wrapper}> */}
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={actualDate}
        renderItem={item => {
          // console.log(item);
          return renderItem(item);
        }}
        // renderDay={(day, item) => {
        // console.log(day);
        // console.log(item);
        // return <Text>{day}</Text>;
        // item - {"category": "Гроші", "deadline": "2023-11-20", "habitStart": "2023-11-11", "id": "1", "name": "Ціль 2", "status": true} || undefined
        // day - "2023-11-12T23:00:00.000Z"
        // if (!item) {
        //   return renderEmptyDate();
        // }
        // return <View style={styles.dayWrapper}>{renderItem(item)}</View>;
        // }}
        onDayPress={day => {
          setSelected(day.dateString);
        }}
        markingType="interactive"
        theme={{
          agendaKnobColor: colors.auxiliary,
          // arrowColor: colors.accent,
          // arrowStyle: { padding: 0 },
          // expandableKnobColor: colors.inputBorder,
          backgroundColor: colors.mainBg,
          calendarBackground: colors.mainBg,
          textDisabledColor: '#c5c5c5',
          textSectionTitleColor: colors.mainText,
          monthTextColor: colors.auxiliaryText,
          textMonthFontSize: fontSizes.s,
          textDayHeaderFontSize: fontSizes.s,
          textDayFontSize: fontSizes.s,
          dayTextColor: colors.auxiliaryText,
          todayTextColor: colors.accent,
          selectedDayBackgroundColor: colors.accent,
          dotStyle: { display: 'none' },
          // stylesheet: {
          //   agenta: {
          //     container: {
          //       // paddingHorizontal: 0,
          //       backgroundColor: colors.mainBg,
          //       // partialHeader: {
          //       //   paddingHorizontal: 0,
          //       // },
          //     },
          //   },
          // },
          // 'stylesheet.agenda.main': {
          //   container: {
          //     flex: 1,
          //     overflow: 'hidden',
          //     backgroundColor: colors.mainBg,
          //   },
          // },
          'stylesheet.agenda.main': {
            reservations: {
              flex: 1,
              marginTop: 104,
              paddingTop: 20,
              backgroundColor: colors.mainBg,
            },
          },
          'stylesheet.agenda.list': {
            container: {
              flexDirection: 'column',
              // backgroundColor: colors.mainBg,
            },
          },
        }}
        // style={styles.calendar}
        // style={{}}
        // renderEmptyDate={renderEmptyDate}
      />
      {/* </View> */}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  title: {
    marginBottom: 10,
  },
  wrapper: {
    flex: 1,
  },
  calendar: {
    margin: 0,
  },
  achievementWrapper: {},
  img: {
    width: 250,
  },
  dayWrapper: {
    // flex: 1,
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderColor: 'red',
    // width: 'auto',
  },
});
