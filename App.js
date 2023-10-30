// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   Image,
//   TouchableOpacity,
// } from 'react-native';

// //1023.910.1172.0
// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Image source={require('./assets/title.png')} style={styles.titleImg} />
//       <Text style={styles.idea}>Збалансуй свої цілі!</Text>
//       <Image source={require('./assets/logo.png')} style={styles.log} />
//       <View style={styles.btnWrapper}>
//         <TouchableOpacity
//           activeOpacity={0.8}
//           style={{ ...styles.btn, ...styles.btnDark }}
//         >
//           <Text style={styles.textLight}>Реєстрація</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           activeOpacity={0.8}
//           style={{ ...styles.btn, ...styles.btnTransparent }}
//         >
//           <Text>Вхід</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.rowContainer}>
//         <Text>Або продовжити з</Text>
//         <Text style={styles.emphasizedText}>Apple, Google</Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // justifyContent: 'center',
//     alignItems: 'center',

//     paddingVertical: 100,

//     backgroundColor: '#EAE0D5',
//   },
//   titleImg: {
//     width: 240,
//     height: 45,
//   },
//   idea: {
//     fontSize: 16,
//     fontWeight: '700',
//     textTransform: 'uppercase',
//     color: '#45050C',
//   },
//   logo: {},
//   input: {
//     borderWidth: 1,
//     height: 40,
//     borderColor: '#ffffff',
//     borderRadius: 10,
//     marginHorizontal: 10,
//     paddingLeft: 10,
//     color: '#ffffff',
//     // width: 50,
//   },
//   btnWrapper: {},
//   btn: {
//     alignItems: 'center',
//     minWidth: 125,
//     paddingVertical: 10,

//     borderWidth: 1,
//     borderRadius: 6,
//   },
//   btnDark: {
//     backgroundColor: '#45050C',
//   },
//   textLight: {
//     color: '#ffffff',
//   },
//   btnTransparent: {
//     backgroundColor: 'transparent',
//     borderColor: '#22333B',
//   },
//   rowContainer: {
//     flexDirection: 'row',
//     gap: 5,
//   },
//   emphasizedText: {
//     fontWeight: '700',
//   },
// });

// import React, { useState, useEffect } from 'react';

// import * as Font from 'expo-font';
// import { AppLoading } from 'expo';
// import { Provider } from 'react-redux';
// import { store } from './redux/store';
// import { Main } from './components/Main';
import { Btn } from './src/components/Btn';
import { View, StyleSheet } from 'react-native';
import { colors } from './src/helpers/variables';

// const loadApplication = async () => {
//   await Font.loadAsync({
//     'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
//     'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
//   });
// };

export default function App() {
  // const [isReady, setIsReady] = useState(false);

  // if (!isReady) {
  //   return (
  //     <AppLoading
  //       startAsync={loadApplication}
  //       onFinish={() => setIasReady(true)}
  //       onError={console.warn}
  //     />
  //   );
  // }

  return (
    // <View>
    //   <Text>Main</Text>
    // </View>
    // <Provider store={store}>
    // <Provider>
    <View style={styles.container}>
      <Btn>Login</Btn>
    </View>
    // </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.mainBg,
  },
});
